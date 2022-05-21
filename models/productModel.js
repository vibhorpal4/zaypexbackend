import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
    description: {
      type: String,
    },
    metaDecsription: {
      type: String,
      required: true,
      maxlength: 150,
    },
    image: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    itemNo: {
      type: String,
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    drawingImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    drawingPdf: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
