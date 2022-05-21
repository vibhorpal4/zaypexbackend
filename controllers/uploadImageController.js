import cloudinary from "cloudinary";

export const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;

    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "Zaypex",
      upload_preset: "zaypex",
    });

    const url = result.secure_url;
    return res.status(201).json(url);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};
