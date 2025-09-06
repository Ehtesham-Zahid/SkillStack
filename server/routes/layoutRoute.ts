import express from "express";
import {
  handleCreateLayout,
  handleEditLayout,
  handleGetLayoutByType,
} from "../controllers/layoutController";
import { isAuthenticated, authorizeRoles } from "../middleware/auth";

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  handleCreateLayout
);

layoutRouter.put(
  "/edit-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  handleEditLayout
);

layoutRouter.get("/get-layout-by-type", handleGetLayoutByType);

export default layoutRouter;
