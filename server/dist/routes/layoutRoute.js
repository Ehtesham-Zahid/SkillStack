"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const layoutController_js_1 = require("../controllers/layoutController.js");
const auth_js_1 = require("../middleware/auth.js");
const userController_js_1 = require("../controllers/userController.js");
const layoutRouter = express_1.default.Router();
layoutRouter.post("/create-layout", 
// handleUpdateAccessToken,
// isAuthenticated,
// authorizeRoles("admin"),
layoutController_js_1.handleCreateLayout);
layoutRouter.put("/edit-layout", userController_js_1.handleUpdateAccessToken, auth_js_1.isAuthenticated, (0, auth_js_1.authorizeRoles)("admin"), layoutController_js_1.handleEditLayout);
layoutRouter.get("/get-layout-by-type", layoutController_js_1.handleGetLayoutByType);
exports.default = layoutRouter;
