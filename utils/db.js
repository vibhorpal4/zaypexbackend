dotenv.config();
import mongoose from "mongoose";
import dotenv from "dotenv";

const MONGODB_URI = process.env.MONGODB_URI;

const DatabaseConnection = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(console.log(`DataBase Connected Successfully`))
    .catch((err) => console.log(err));
};

export default DatabaseConnection;
