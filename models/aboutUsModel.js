import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const aboutUsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutUsSchema);
