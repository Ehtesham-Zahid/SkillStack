import { app } from "./app";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import connectDB from "./utils/db";
import http from "http";
import { initSocketServer } from "./socketServer";
dotenv.config();
const server = http.createServer(app);
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
initSocketServer(server);
server.listen(process.env.PORT, () => {
    console.log(`Server is connected with port ${process.env.PORT}`);
    connectDB();
});
