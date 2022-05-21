import mongoose from "mongoose";
import validator from "validator";

const contactUsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: validator.isEmail,
      trim: true,
      lowercase: true,
    },
    contactNo: {
      type: String,
      required: true,
      minlength: 10,
    },
    address: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ContactUs", contactUsSchema);
