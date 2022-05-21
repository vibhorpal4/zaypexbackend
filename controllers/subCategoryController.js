import SubCategory from "../models/subCategoryModel.js";
import Category from "../models/categoryModel.js";
import cloudinary from "cloudinary";
import { unlinkSync } from "node:fs";

export const createSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const { image } = req.files;
    if (!name || !image) {
      return res.status(400).json({ message: `Please fill all the fields` });
    }
    const cate = await Category.findById(category);
    if (!cate) {
      return res
        .status(400)
        .json({ message: `Please Select a valid category` });
    }

    const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      folder: "Zaypex",
      upload_preset: "zaypex",
    });

    unlinkSync(`${image.tempFilePath}`);

    const subCategory = await SubCategory.create({
      name,
      category,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    await cate.updateOne({
      subCategories: subCategory._id,
    });
    return res
      .status(201)
      .json({ message: `Created Successfull`, subCategory });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getAllSubCategoriesOfCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const subCategories = await SubCategory.find({
      category,
    });
    return res
      .status(200)
      .json({ message: `Loaded Succesfull`, subCategories });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    return res
      .status(200)
      .json({ message: `Loaded Successfull`, subCategories });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const subCategory = await SubCategory.findOne({ slug });
    if (!subCategory) {
      return res.status(404).json({ message: `Not found` });
    }
    const category = await Category.findOne({
      $in: {
        subCategories: subCategory._id,
      },
    });
    if (!category) {
      return res.status(400).json({ message: `Somthing not good` });
    }
    await category.updateOne({
      $pull: {
        subCategories: subCategory._id,
      },
    });
    await subCategory.deleteOne();
    return res.status(200).json({ message: `Deleted Successfull` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const updateSubCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;
    const { image } = req.files;

    const subCategory = await SubCategory.findOne({ slug });
    if (!subCategory) {
      return res.status(404).json({ message: `Not Found` });
    }

    if (image) {
      await cloudinary.v2.uploader.destroy(subCategory.image.public_id);

      const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
        folder: "Zaypex",
        upload_preset: "zaypex",
      });

      unlinkSync(`${image.tempFilePath}`);

      await subCategory.updateOne({
        name: name ? name : subCategory.name,
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });
      return res.status(201).json({ message: `Updated Successfull` });
    }

    await subCategory.updateOne({
      name,
      image: subCategory.image,
    });
    return res.status(201).json({ message: `Updated Successfull` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export const getSubCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const subCategory = await SubCategory.findOne({ slug });
    if (!subCategory) {
      return res.status(404).json({ message: `Not Found` });
    }

    return res.status(200).json({ message: `Loaded Successfull`, subCategory });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};
