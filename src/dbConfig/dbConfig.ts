import mongoose from "mongoose";
export async function connect() {
  try {
    console.log("connection building");
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("connection successfull");
    });
    connection.on("error", (err) => {
      console.log(err);
      process.exit();
    });
  } catch (error: any) {
    console.log(error);
  }
}
