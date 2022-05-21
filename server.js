dotenv.config();

//importing dependencies
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import DatabaseConnection from "./utils/db.js";

//importing routes
import authRoutes from "./routes/authRoutes.js";
import contactUsRoutes from "./routes/contactUsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import aboutUsRoutes from "./routes/aboutUsRoutes.js";
import imageUploadRoutes from "./routes/uploadImageRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

//initializing server
const app = express();

//Middlewares
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//setting up routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/contact-us", contactUsRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/about-us", aboutUsRoutes);
app.use("/api/v1/image", imageUploadRoutes);
app.use("/api/v1/home", homeRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/sub-category", subCategoryRoutes);

//Database Connection
DatabaseConnection();

//Cloudiary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//connecting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on port: ${PORT}`);
  }
});
