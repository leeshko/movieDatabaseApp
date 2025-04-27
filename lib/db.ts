import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
    console.error(error.message);
    throw new Error(error.message);
  } else {
    console.error("An unknown error occurred");
    throw new Error("An unknown error occurred");
  }
  }
};

export default connectDB;
