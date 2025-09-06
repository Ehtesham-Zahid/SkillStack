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
} from "../controllers/userController";
import { isAuthenticated, authorizeRoles } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", handleRegisterUser);
userRouter.post("/activate-user", handleActivateUser);
userRouter.post("/login", handleLoginUser);
userRouter.get("/logout", isAuthenticated, handleLogoutUser);
userRouter.get("/update-access-token", handleUpdateAccessToken);
userRouter.get("/me", isAuthenticated, handleGetUserInfo);
userRouter.post("/social-auth", handleSocialAuth);
userRouter.put("/update-user-info", isAuthenticated, handleUpdateUserInfo);

userRouter.get(
  "/get-all-users-admin",
  isAuthenticated,
  authorizeRoles("admin"),
  handleGetAllUsers
);

userRouter.put(
  "/update-user-role-admin",
  isAuthenticated,
  authorizeRoles("admin"),
  handleUpdateUserRole
);

userRouter.delete(
  "/delete-user-admin/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  handleDeleteUser
);

export default userRouter;
