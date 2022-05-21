import User from "../models/userModel.js";
import tokenGenerator from "../utils/tokenGenerator.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    if (!username || !name || !email || !password) {
      return res.status(400).json({ message: `Please fill all the fields` });
    }
    const oldEmail = await User.findOne({ email });
    if (oldEmail) {
      return res.status(400).json({ message: `Email is already in use` });
    }
    const oldUsername = await User.findOne({ username });
    if (oldUsername) {
      return res.status(400).json({ message: `Username is already in use` });
    }
    const newUser = await User.create({
      name,
      username,
      email,
      password,
    });
    const user = await newUser.save();
    tokenGenerator(user, 201, res, `User created successfully`);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: `Please fill all the required fields` });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: `Invalid Credentials` });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: `Invalid Credentials` });
    }
    tokenGenerator(user, 200, res, `Login Successfully`);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: `Please fill all the required fields` });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: `Invalid Credentials` });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: `Invalid Credentials` });
    }

    if (user.role !== "admin") {
      return res.status(401).json({ message: `Only Admin can access` });
    }

    tokenGenerator(user, 200, res, `Login Successfully`);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const logout = async (req, res) => {
  try {
    await res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    return res.status(200).json({ message: `Logout Succeessfully` });
  } catch (error) {
    return res.status(500).json({ message: `Internal server Error` });
  }
};
