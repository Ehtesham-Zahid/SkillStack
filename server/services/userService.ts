import userModel, { IUser } from "../models/userModel";
import { redis } from "../utils/redis";
import { sendMail } from "../utils/email";
import { sendToken, ITokenOptions } from "../utils/jwt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import ErrorHandler from "../utils/ErrorHandler";
import path from "path";

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
  const isEmailExist = await userModel.findOne({ email });
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
    path.join(__dirname, "../mails/activation-mail.ejs"),
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

  const userExist = await userModel.findOne({ email });

  if (userExist) {
    throw new ErrorHandler("User already exist", 400);
  }

  await userModel.create({ name, email, password });
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

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    throw new ErrorHandler("Invalid credentials", 400);
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
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
    throw new ErrorHandler("Session not found. Please login again.", 400);
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
// // get user by id
// export const getUserById = async (id: string, res: Response) => {
//   const userJson = await redis.get(id);
//   if (userJson) {
//     const user = JSON.parse(userJson);
//     res.status(200).json({ success: true, user });
//   }
// };
