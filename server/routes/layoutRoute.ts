import express from "express";
import {
  handleCreateLayout,
  handleEditLayout,
  handleGetLayoutByType,
} from "../controllers/layoutController";
import { isAuthenticated, authorizeRoles } from "../middleware/auth";
import { handleUpdateAccessToken } from "../controllers/userController";

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  handleUpdateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  handleCreateLayout
);

layoutRouter.put(
  "/edit-layout",
  handleUpdateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  handleEditLayout
);

layoutRouter.get(
  "/get-layout-by-type",
  isAuthenticated,
  authorizeRoles("admin"),
  handleGetLayoutByType
);

export default layoutRouter;
