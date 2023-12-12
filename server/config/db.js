import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MANGO_URI);
  } catch (error) {}

  const connection = mongoose.connection;
  if (connection.readyState >= 1) {
    console.log("connected to DB");
    return;
  }

  connection.on("error", () => console.log("connection failed"));
};
export default connectDB;
