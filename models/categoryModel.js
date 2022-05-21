import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
