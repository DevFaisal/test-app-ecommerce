import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/FMU");
    console.log(">>> DB is connected");
  } catch (e) {
    console.log("Something went wrong");
    console.log(e);
  }
}
