import mongoose from "mongoose";

const connectToDB = async () => {
    // return if already connected
  if (mongoose.connection.readyState === 1)  return
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Database Connected");
  } catch (error) {
    console.log("❌ Failed to connect to database", error);
  }
};
export default connectToDB;
