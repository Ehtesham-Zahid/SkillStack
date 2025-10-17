import { Server as SocketIOServer } from "socket.io";
export const initSocketServer = (server) => {
    const io = new SocketIOServer(server);
    io.on("connection", (socket) => {
        console.log("A user connected");
        // Listen for notification events from the frontend
        socket.on("notification", (data) => {
            // Broadcast the notification to all connected users(admin dashboard)
            io.emit("newNotification", data);
        });
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
};
