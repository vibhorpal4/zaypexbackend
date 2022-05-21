import { HomeAbout, HeroText, HeroImage } from "../models/homeModel.js";
import cloudinary from "cloudinary";
import Caterory from "../models/categoryModel.js";
import { unlinkSync } from "node:fs";

export const createHeroText = async (req, res) => {
  try {
    const { title, text } = req.body;
    if (!title || !text) {
      return res
        .status(400)
        .json({ message: `Please fill all the required fields` });
    }

    const heroText = await HeroText.create({
      title,
      text,
    });

    await heroText.save();
    return res.status(201).json({ message: `Created Successfully`, heroText });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getAllHeroTexts = async (req, res) => {
  try {
    const heroTexts = await HeroText.find();
    return res.status(200).json({ message: `Loaded Successfully`, heroTexts });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const deleteHeroText = async (req, res) => {
  try {
    const { id } = req.params;
    const heroText = await HeroText.findById(id);
    if (!heroText) {
      return res.status(404).json({ message: `Not Found` });
    }
    await heroText.deleteOne();
    return res.status(200).json({ message: `Deleted Successfully` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

// export const editHeroText = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, text } = req.body;
//     const heroText = await HeroText.findById(id);
//     if (!heroText) {
//       return res.status(404).json({ message: `Not found` });
//     }

//     await heroText.updateOne({
//       title,
//       text,
//     });

//     return res.status(201).json({ message: `Update Successfull` });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `Internal Server Error` });
//   }
// };

export const createHeroImage = async (req, res) => {
  try {
    const { image } = req.files;
    console.log(image);
    if (!image) {
      return res
        .status(400)
        .json({ message: `Please fill all the required fields` });
    }

    const result = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      folder: "Zaypex",
      upload_preset: "zaypex",
    });

    unlinkSync(`${image.tempFilePath}`);

    const heroImage = await HeroImage.create({
      public_id: result.public_id,
      url: result.secure_url,
    });

    await heroImage.save();

    return res.status(201).json({ message: `Created Successfully`, heroImage });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getAllHeroImages = async (req, res) => {
  try {
    const heroImages = await HeroImage.find();
    return res.status(200).json({ message: `Loaded Successfully`, heroImages });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const deleteHeroImage = async (req, res) => {
  try {
    const { id } = req.params;
    const heroImage = await HeroImage.findById(id);
    if (!heroImage) {
      return res.status(404).json({ message: "Not Found" });
    }
    await cloudinary.v2.uploader.destroy(heroImage.public_id);
    await heroImage.deleteOne();
    return res.status(200).json({ message: `Deleted Successfully` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const createAbout = async (req, res) => {
  try {
    console.log(req.body);
    const { text } = req.body;
    if (!text) {
      return res
        .status(400)
        .json({ message: `Please fill all the required fields` });
    }
    const about = await HomeAbout.create({
      text,
    });

    await about.save();
    return res.status(201).json({ message: `Created successfully`, about });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await HomeAbout.findById(id);
    if (!about) {
      return res.status(404).json({ message: `Not found` });
    }
    await about.deleteOne();
    return res.status(201).json({ message: `Deleted successfully` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getAllAbout = async (req, res) => {
  try {
    const about = await HomeAbout.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: `Loaded Successfully`, about });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getHomePage = async (req, res) => {
  try {
    const heroTexts = await HeroText.find();
    const heroImages = await HeroImage.find();
    const about = await HomeAbout.findOne().sort({ createdAt: -1 });
    const categories = await Caterory.find();

    return res.status(200).json({
      message: `Loaded Successfully`,
      heroTexts,
      heroImages,
      about,
      categories,
    });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};
