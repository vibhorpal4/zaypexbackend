import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    contactUsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContactUs",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
