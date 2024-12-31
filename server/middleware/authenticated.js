import JWT from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies["token"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token not found",
      });
    }

    const decoded = await JWT.verify(token, process.env.JWT);

    req.uid = decoded._id;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
