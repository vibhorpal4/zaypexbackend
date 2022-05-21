const adminMiddleware = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: `Unauthorized Access` });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error:${error.message}` });
  }
};

export default adminMiddleware;
