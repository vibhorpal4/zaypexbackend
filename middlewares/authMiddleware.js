import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log(token);
    if (!token) {
      return res.status(401).json({ message: `Token Not Found` });
    }
    const verify = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
      return res.status(401).json({ message: `Unauthorized Access` });
    }
    const user = await User.findById(verify.id);
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export default authMiddleware;
