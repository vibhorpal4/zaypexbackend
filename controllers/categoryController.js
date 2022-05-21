import Category from "../models/categoryModel.js";
import cloudinary from "cloudinary";
import { unlinkSync } from "node:fs";

export const craeteCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { image } = req.files;
    if (!name || !image) {
      return res.status(400).json({ message: `Please fill all the fields` });
    }

    const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      folder: "Zaypex",
      upload_preset: "zaypex",
    });

    unlinkSync(`${image.tempFilePath}`);

    const category = await Category.create({
      name,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    await category.save();
    return res.status(201).json({ message: `Created Successfull`, category });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ message: `Loaded Successfull`, categories });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ message: `Not Found` });
    }

    await category.deleteOne();
    return res.status(200).json({ message: `Deleted Successfull` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;
    const { image } = req.files;

    const category = await Category.findOne({ slug });

    if (!category) {
      return res.status(404).json({ message: `Not Found` });
    }

    if (image) {
      await cloudinary.v2.uploader.destroy(category.image.public_id);

      const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
        folder: "Zaypex",
        upload_preset: "zaypex",
      });

      unlinkSync(`${image.tempFilePath}`);

      await category.updateOne({
        name: name ? name : category.name,
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });

      return res.status(201).json({ message: `Updated Successfull` });
    }

    await category.updateOne({
      name,
      image: category.image,
    });

    return res.status(201).json({ message: `Updated Successfull` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ message: `Not Found` });
    }
    return res.status(200).json({ message: "Loaded Successfull", category });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};
