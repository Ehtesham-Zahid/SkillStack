import { app } from "./app.js";
import dotenv from "dotenv";
import http from "http";
import { initSocketServer } from "./socketServer.js";
dotenv.config();
const server = http.createServer(app);

initSocketServer(server);

server.listen(process.env.PORT, () => {
  console.log(`Server is connected with port ${process.env.PORT}`);
});
