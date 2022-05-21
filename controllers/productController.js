import Product from "../models/productModel.js";
import SubCategory from "../models/subCategoryModel.js";
import cloudinary from "cloudinary";
import { unlinkSync } from "node:fs";

export const createProduct = async (req, res) => {
  try {
    const { name, description, metaDescription, itemNo, subCategory } =
      req.body;
    console.log(req.body);

    const { image, drawingImage, drawingPdf } = req.files;

    console.log(req.files);

    if (
      !name ||
      !description ||
      !metaDescription ||
      !image ||
      !itemNo ||
      !subCategory ||
      !drawingImage ||
      !drawingPdf
    ) {
      return res.status(400).json({ message: `Please fill all the fields` });
    }

    const category = await SubCategory.findOne(subCategory);

    if (!category) {
      return res
        .status(400)
        .json({ message: `Please select a valid product category` });
    }

    console.log(`Category check done`);

    const imageResult = await cloudinary.v2.uploader.upload(
      image.tempFilePath,
      {
        folder: "Zaypex",
        upload_preset: "zaypex",
      }
    );

    unlinkSync(`${image.tempFilePath}`);

    console.log(`Image Upload`);

    const drawingImageResult = await cloudinary.v2.uploader.upload(
      drawingImage.tempFilePath,
      {
        folder: "Zaypex",
        upload_preset: "zaypex",
      }
    );

    unlinkSync(`${drawingImage.tempFilePath}`);

    console.log(`Drawing Image Upload`);

    const drawingPdfResult = await cloudinary.v2.uploader.upload(
      drawingPdf.tempFilePath,
      {
        folder: "Zaypex",
        upload_preset: "zaypex",
      }
    );

    unlinkSync(`${drawingPdf.tempFilePath}`);

    console.log(`drawing PDF upload`);

    const product = await Product.create({
      name,
      description,
      metaDescription,
      image: {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      },
      itemNo,
      drawingImage: {
        public_id: drawingImageResult.public_id,
        url: drawingImageResult.secure_url,
      },
      drawingPdf: {
        public_id: drawingPdfResult.public_id,
        url: drawingPdfResult.secure_url,
      },
      subCategory: category._id,
    });

    return res.status(201).json({ message: `Created Successfully`, product });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getAllproducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: `Loaded Successfully`, products });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getProductBySubCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({
      subCategory: category,
    });

    return res.status(200).json({ message: `Loaded Successfully`, products });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ message: `Not Found` });
    }
    await product.deleteOne();
    return res.status(200).json({ message: `Deleted Successfuly` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name, description, metaDescription, itemNo } = req.body;
    const { image, drawingImage, drawingPdf } = req.files;

    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ message: `Not Found` });
    }

    if (image) {
      await cloudinary.v2.uploader.destroy(product.image.public_id);

      const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
        folder: "Zaypex",
        upload_preset: "zaypex",
      });

      unlinkSync(`${image.tempFilePath}`);

      await product.updateOne({
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
        name: name ? name : product.name,
        description: description ? description : product.description,
        metaDescription: metaDescription
          ? metaDescription
          : product.metaDescription,
        itemNo: itemNo ? itemNo : product.itemNo,
        drawingImage: product.drawingImage,
        drawingPdf: product.drawingPdf,
      });
      return res.status(201).json({ message: `Updated Successfull` });
    } else if (drawingImage) {
      await cloudinary.v2.uploader.destroy(product.drawingImage.public_id);

      const result = await cloudinary.v2.uploader.upload(
        drawingImage.tempFilePath,
        {
          folder: "Zaypex",
          upload_preset: "zaypex",
        }
      );

      unlinkSync(`${drawingImage.tempFilePath}`);

      await product.updateOne({
        image: product.image,
        name: name ? name : product.name,
        description: description ? description : product.description,
        metaDescription: metaDescription
          ? metaDescription
          : product.metaDescription,
        itemNo: itemNo ? itemNo : product.itemNo,
        drawingImage: {
          public_id: result.public_id,
          url: result.secure_url,
        },
        drawingPdf: product.drawingPdf,
      });
      return res.status(201).json({ message: `Updated Successfull` });
    } else if (drawingPdf) {
      await cloudinary.v2.uploader.destroy(product.drawingPdf.public_id);

      const result = await cloudinary.v2.uploader.upload(
        drawingPdf.tempFilePath,
        {
          folder: "Zaypex",
          upload_preset: "zaypex",
        }
      );

      unlinkSync(`${drawingPdf.tempFilePath}`);

      await product.updateOne({
        image: product.image,
        name: name ? name : product.name,
        description: description ? description : product.description,
        metaDescription: metaDescription
          ? metaDescription
          : product.metaDescription,
        itemNo: itemNo ? itemNo : product.itemNo,
        drawingImage: product.drawingImage,
        drawingPdf: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      });
      return res.status(201).json({ message: `Updated Successfull` });
    } else {
      await product.updateOne({
        image: product.image,
        name: name ? name : product.name,
        description: description ? description : product.description,
        metaDescription: metaDescription
          ? metaDescription
          : product.metaDescription,
        itemNo: itemNo ? itemNo : product.itemNo,
        drawingImage: product.drawingImage,
        drawingPdf: product.drawingPdf,
      });
      return res.status(201).json({ message: `Updated Successfull` });
    }
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ message: `Not Found` });
    }
    return res.status(200).json({ message: `Loaded Success`, product });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};
