import express from "express";
import {
  handleRegisterUser,
  handleActivateUser,
  handleLoginUser,
  handleLogoutUser,
  handleUpdateAccessToken,
  handleGetUserInfo,
  handleSocialAuth,
  handleUpdateUserInfo,
  handleGetAllUsers,
  handleUpdateUserRole,
  handleDeleteUser,
  handleUpdateProfilePicture,
  handleUpdatePassword,
} from "../controllers/userController.js";
import { isAuthenticated, authorizeRoles } from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/registration", handleRegisterUser);
userRouter.post("/activate-user", handleActivateUser);
userRouter.post("/login", handleLoginUser);
userRouter.get("/logout", isAuthenticated, handleLogoutUser);
userRouter.get("/update-access-token", handleUpdateAccessToken);
userRouter.post("/social-auth", handleSocialAuth);
userRouter.get(
  "/me",
  handleUpdateAccessToken,
  isAuthenticated,
  handleGetUserInfo
);
userRouter.put(
  "/update-user-info",
  handleUpdateAccessToken,
  isAuthenticated,
  handleUpdateUserInfo
);
userRouter.put(
  "/update-password",
  handleUpdateAccessToken,
  isAuthenticated,
  handleUpdatePassword
);
userRouter.put(
  "/update-profile-picture",
  handleUpdateAccessToken,
  isAuthenticated,
  handleUpdateProfilePicture
);

userRouter.get(
  "/get-all-users-admin",
  handleUpdateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  handleGetAllUsers
);

userRouter.put(
  "/update-user-role-admin",
  handleUpdateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  handleUpdateUserRole
);

userRouter.delete(
  "/delete-user-admin/:id",
  handleUpdateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  handleDeleteUser
);

export default userRouter;
