import ejs from "ejs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

import userModel, { IUser } from "../models/userModel";
import { redis } from "../utils/redis";
import { sendMail } from "../utils/email";
import { sendToken, ITokenOptions } from "../utils/jwt";
import ErrorHandler from "../utils/ErrorHandler";

const __dirname = path.resolve();

// Register User
// create activation token
interface IActivationToken {
  token: string;
  activationCode: string;
}

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

const createActivationToken = (user: IRegistrationBody): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

// registration user
export const registerUser = async (userData: IRegistrationBody) => {
  const { name, email } = userData as IRegistrationBody;
  const isEmailExist = (await userModel.findOne({ email })) as IUser;
  if (isEmailExist) {
    throw new ErrorHandler("Email already exist", 400);
  }

  const activationToken = createActivationToken(userData);

  const activationCode = activationToken.activationCode;

  const mailData = {
    user: {
      name,
      email,
    },
    activationCode,
  };

  const html = await ejs.renderFile(
    path.join(__dirname, "./mails/activation-mail.ejs"),
    mailData
  );

  await sendMail({
    to: email,
    subject: "Account Activation",
    html,
  });

  return {
    token: activationToken.token,
    email,
  };
};

// activate user
interface IActivationRequestBody {
  activationToken: string;
  activationCode: string;
}

export const activateUser = async (activationData: IActivationRequestBody) => {
  const { activationToken, activationCode } =
    activationData as IActivationRequestBody;

  const newUser: { user: IRegistrationBody; activationCode: string } =
    jwt.verify(activationToken, process.env.ACTIVATION_SECRET as Secret) as {
      user: IRegistrationBody;
      activationCode: string;
    };

  if (!newUser) {
    throw new ErrorHandler("Invalid activation token", 400);
  }

  if (newUser.activationCode !== activationCode) {
    throw new ErrorHandler("Invalid activation code", 400);
  }

  const { name, email, password } = newUser.user;

  const userExist = (await userModel.findOne({ email })) as IUser;

  if (userExist) {
    throw new ErrorHandler("User already exist", 400);
  }

  (await userModel.create({ name, email, password })) as IUser;
};

// login user
interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = async (
  loginData: ILoginRequest
): Promise<{
  accessToken: string;
  refreshToken: string;
  user: IUser;
  accessTokenOptions: ITokenOptions;
  refreshTokenOptions: ITokenOptions;
}> => {
  const { email, password } = loginData as ILoginRequest;

  if (!email || !password) {
    throw new ErrorHandler("Please enter email and password", 400);
  }

  const user = (await userModel
    .findOne({ email })
    .select("+password")) as IUser;

  if (!user) {
    console.log("Invalid credentials 1");
    throw new ErrorHandler("Invalid credentials", 400);
  }

  const isPasswordCorrect = (await user.comparePassword(password)) as boolean;

  if (!isPasswordCorrect) {
    console.log("Invalid credentials 2");
    throw new ErrorHandler("Invalid credentials", 400);
  }

  return (await sendToken(user)) as {
    accessToken: string;
    refreshToken: string;
    user: IUser;
    accessTokenOptions: ITokenOptions;
    refreshTokenOptions: ITokenOptions;
  };
};

// update access token
export const updateAccessToken = async (
  refreshToken: string
): Promise<{
  accessToken: string;
  refreshToken: string;
  user: IUser;
  accessTokenOptions: ITokenOptions;
  refreshTokenOptions: ITokenOptions;
}> => {
  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as Secret
  ) as JwtPayload;

  if (!decoded) {
    throw new ErrorHandler("Invalid refresh token", 400);
  }

  const session = await redis.get(decoded.id as string);
  if (!session) {
    throw new ErrorHandler("Please login to access this resource.", 400);
  }

  const user = JSON.parse(session) as IUser;

  return (await sendToken(user)) as {
    accessToken: string;
    refreshToken: string;
    user: IUser;
    accessTokenOptions: ITokenOptions;
    refreshTokenOptions: ITokenOptions;
  };
};

// Update Password

interface IUpdatePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export const updatePassword = async (
  passwordData: IUpdatePasswordBody,
  userId: string
): Promise<IUser> => {
  const { oldPassword, newPassword } = passwordData as IUpdatePasswordBody;
  if (!oldPassword || !newPassword) {
    throw new ErrorHandler("Please enter old and new password", 400);
  }

  const user = (await userModel
    .findById(userId as string)
    .select("+password")) as IUser;

  if (user?.password === undefined) {
    throw new ErrorHandler("Initial login required", 404);
  }

  const isPasswordCorrect = (await user.comparePassword(
    oldPassword
  )) as boolean;

  if (!isPasswordCorrect) {
    throw new ErrorHandler("Invalid old password", 400);
  }

  user.password = newPassword;
  await user.save();

  await redis.set(userId as string, JSON.stringify(user as IUser));

  return user as IUser;
};

interface IUpdateUserInfoBody {
  name: string;
}

export const updateUserInfo = async (
  userData: IUpdateUserInfoBody,
  user: IUser
): Promise<IUser> => {
  const { name } = userData as IUpdateUserInfoBody;

  if (name && user) {
    user.name = name;
  }

  await user?.save();

  await redis.set(user._id as string, JSON.stringify(user as IUser));

  return user as IUser;
};

// update profile picture
export const updateProfilePicture = async (
  avatar: string,
  user: IUser
): Promise<IUser> => {
  if (avatar && user) {
    if (user?.avatar?.public_id) {
      await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
        width: 150,
      });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    } else {
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
        width: 150,
      });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
  }

  await user?.save();

  await redis.set(user._id as string, JSON.stringify(user as IUser));

  return user as IUser;
};

// social auth
interface ISocialAuthBody {
  email: string;
  name: string;
  avatar: string;
}

export const socialAuth = async (
  userData: ISocialAuthBody
): Promise<{
  accessToken: string;
  refreshToken: string;
  user: IUser;
  accessTokenOptions: ITokenOptions;
  refreshTokenOptions: ITokenOptions;
}> => {
  const { email, name, avatar } = userData as ISocialAuthBody;
  const user = (await userModel.findOne({ email })) as IUser;

  if (!user) {
    const newUser = (await userModel.create({
      email,
      name,
      avatar: { public_id: avatar, url: avatar },
    })) as IUser;
    return (await sendToken(newUser)) as {
      accessToken: string;
      refreshToken: string;
      user: IUser;
      accessTokenOptions: ITokenOptions;
      refreshTokenOptions: ITokenOptions;
    };
  } else {
    // if (!user.avatar?.url && avatar) {
    //   user.avatar = {
    //     public_id: avatar,
    //     url: avatar,
    //   };
    //   await user.save();
    // }
    return (await sendToken(user)) as {
      accessToken: string;
      refreshToken: string;
      user: IUser;
      accessTokenOptions: ITokenOptions;
      refreshTokenOptions: ITokenOptions;
    };
  }
};

// Get All Users --- Admin
export const getAllUsers = async () => {
  const users = await userModel
    .find()
    .select("-password")
    .sort({ createdAt: -1 });
  return users;
};

interface IUpdateUserRoleBody {
  id: string;
  role: string;
}
// Update User Role --- Admin
export const updateUserRole = async (userData: IUpdateUserRoleBody) => {
  const { id, role } = userData as IUpdateUserRoleBody;
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }
  await redis.set(user._id as string, JSON.stringify(user as IUser));
  return user;
};

// Delete User --- Admin
export const deleteUser = async (userId: string) => {
  const user = await userModel.findById(userId);
  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }
  await user.deleteOne();
  await redis.del(userId as string);
};
