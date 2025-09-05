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
} from "../controllers/userController";
import { isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", handleRegisterUser);
userRouter.post("/activate-user", handleActivateUser);
userRouter.post("/login", handleLoginUser);
userRouter.get("/logout", isAuthenticated, handleLogoutUser);
userRouter.get("/update-access-token", handleUpdateAccessToken);
userRouter.get("/me", isAuthenticated, handleGetUserInfo);
userRouter.post("/social-auth", handleSocialAuth);
userRouter.put("/update-user-info", isAuthenticated, handleUpdateUserInfo);

export default userRouter;
