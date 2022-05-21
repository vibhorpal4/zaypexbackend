import About from "../models/aboutUsModel.js";

export const createAbout = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(req.body);
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: `Please fill all the required fields` });
    }
    const aboutUs = await About.create({
      title,
      description,
    });
    await aboutUs.save();

    return res.status(201).json({ message: `Created Successfully` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getAllAbout = async (req, res) => {
  try {
    const aboutUs = await About.find();
    return res.status(200).json({ message: `Loaded Successfully`, aboutUs });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getAboutBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const about = await About.findOne({ slug });
    if (!about) {
      return res.status(404).json({ message: `Not found` });
    }

    return res.status(200).json({ message: `Loaded Successfully`, about });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const editAboutUs = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, description } = req.body;
    const aboutUs = await About.findOne({ slug });
    if (!aboutUs) {
      return res.status(404).json({ message: `Not found` });
    }
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: `Please fill all the required fields` });
    }
    await aboutUs.updateOne({
      title,
      description,
    });
    return res.status(201).json({ message: `Updated successfull` });
  } catch (error) {
    return res.status(500).json(`Internal Server Error`);
  }
};

export const deleteAboutBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const aboutUs = await About.findOne({ slug });
    if (!aboutUs) {
      return res.status(404).json({ message: `Not found` });
    }
    await aboutUs.deleteOne();
    return res.status(200).json({ message: `Deleted Successfully` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};
