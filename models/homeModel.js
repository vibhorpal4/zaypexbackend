import mongoose from "mongoose";

const heroTextSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const heroImageSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const productCategorySchema = new mongoose.Schema(
  {
    productCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const aboutSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const HeroText = mongoose.model("HeroText", heroTextSchema);
export const HeroImage = mongoose.model("HeroImage", heroImageSchema);
export const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);
export const HomeAbout = mongoose.model("HomeAbout", aboutSchema);
