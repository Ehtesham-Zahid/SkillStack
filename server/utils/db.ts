import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let retryCount = 0;
const maxRetries = 5;

const connectionUri: string = process.env.DB_URL || process.env.MONGO_URI || "";

// Increase Mongoose's query buffering timeout (default is 10000ms)
mongoose.set("bufferTimeoutMS", 60000);
// Optional: use IPv4 DNS resolution in some environments
// (helps avoid long IPv6 DNS resolution delays)
// @ts-ignore - option is forwarded to the driver
// mongoose.set('family', 4);

const connectDB = async (): Promise<void> => {
  if (!connectionUri) {
    console.error(
      "MongoDB connection URI is missing. Set DB_URL or MONGO_URI."
    );
    process.exit(1);
  }
  try {
    const data = await mongoose.connect(connectionUri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      retryWrites: true,
      maxPoolSize: 10,
      family: 4,
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
