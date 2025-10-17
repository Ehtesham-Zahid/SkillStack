"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = __importDefault(require("./utils/db.js"));
const http_1 = __importDefault(require("http"));
const socketServer_js_1 = require("./socketServer.js");
dotenv_1.default.config();
const server = http_1.default.createServer(app_js_1.app);
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
(0, socketServer_js_1.initSocketServer)(server);
server.listen(process.env.PORT, () => {
    console.log(`Server is connected with port ${process.env.PORT}`);
    (0, db_js_1.default)();
});
