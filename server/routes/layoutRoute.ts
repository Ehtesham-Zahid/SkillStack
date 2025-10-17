import express from "express";
import {
  handleCreateLayout,
  handleEditLayout,
  handleGetLayoutByType,
} from "../controllers/layoutController.js";
import { isAuthenticated, authorizeRoles } from "../middleware/auth.js";
import { handleUpdateAccessToken } from "../controllers/userController.js";

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  // handleUpdateAccessToken,
  // isAuthenticated,
  // authorizeRoles("admin"),
  handleCreateLayout
);

layoutRouter.put(
  "/edit-layout",
  handleUpdateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  handleEditLayout
);

layoutRouter.get("/get-layout-by-type", handleGetLayoutByType);

export default layoutRouter;
