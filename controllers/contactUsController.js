import ContactUs from "../models/contactUsModel.js";
import Notification from "../models/notificationModel.js";

export const createContact = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, message, address, contactNo } = req.body;
    if (!name || !email || !message || !contactNo) {
      return res
        .status(400)
        .json({ message: `Please fill all the required fields` });
    }
    const newContactForm = await ContactUs.create({
      name,
      email,
      message,
      address,
      contactNo,
    });
    await newContactForm.save();

    await Notification.create({
      text: `${email} asked a query`,
      contactUsId: newContactForm._id,
    });

    return res.status(201).json({
      message: `Form Submitted Successfully`,
    });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await ContactUs.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: `Contacts loaded successfully`, contacts });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await ContactUs.findById(id);
    return res
      .status(200)
      .json({ message: `Contact Loaded Successfully`, contact });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};
