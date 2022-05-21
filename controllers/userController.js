import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: `Users are Loaded Successfully`, users });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }
    return res.status(200).json({ message: `User loaded Successfully`, user });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const changeRole = async (req, res) => {
  try {
    const { username } = req.params;
    const { role } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }
    await user.updateOne({
      role,
    });
    return res.status(201).json({ message: `User role updated Successfully` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }
    await user.deleteOne();
    return res.status(201).json({ message: `User deleted successfully` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { password, newPassword, confirmPassword } = req.body;
    if (!password || !confirmPassword || !newPassword) {
      return res.status(400).json({ message: `Please fill all the fields` });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: `Password and Confirm Password must be same` });
    }
    const user = await User.findById(req.user._id).select("+password");
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: `Password is Incorrect` });
    }
    const pswd = await bcrypt.hash(newPassword, 10);
    await user.updateOne({
      password: pswd,
    });
    return res.status(201).json({ message: `Password Change Successfull` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};
