import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const subCategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

export default mongoose.model("SubCategory", subCategoriesSchema);
