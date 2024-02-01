import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/meropasal");
    console.log("Connected to db successfully!");
  } catch (error) {
    console.log(error, "Unable to connect!");
  }
};

export default connectDB;
