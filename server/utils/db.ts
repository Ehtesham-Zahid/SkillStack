import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let retryCount = 0;
const maxRetries = 5;

const connectionUri: string = process.env.DB_URL || process.env.MONGO_URI || "";

const connectDB = async (): Promise<void> => {
  try {
    const data = await mongoose.connect(connectionUri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      maxPoolSize: 10,
    } as any);

    console.log(`MongoDB connected with server: ${data.connection.host}`);
    retryCount = 0;
  } catch (err: any) {
    console.error(
      `Database connection failed (attempt ${retryCount + 1}/${maxRetries}):`,
      err.message
    );

    if (retryCount < maxRetries) {
      retryCount++;
      console.log(`Retrying in 5 seconds...`);
      setTimeout(connectDB, 5000);
    } else {
      console.error("Max retries reached. Exiting...");
      process.exit(1);
    }
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected! Attempting to reconnect...");
  connectDB();
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected successfully");
});

export default connectDB;
