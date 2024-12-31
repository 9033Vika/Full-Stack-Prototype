import classSchema from "../models/Class.js";
import userSchema from "../models/User.js";

export const getClass = async (req, res) => {
  try {
    const classes = await classSchema.find();

    return res.status(201).json({
      success: true,
      classes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const addClass = async (req, res) => {
  try {
    const admin = await userSchema.findById(req.uid);

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!admin.isAdmin) {
      return res.status(400).json({
        success: false,
        message: "You are not admin",
      });
    }

    const { className } = req.body;

    if (!className) {
      return res.status(400).json({
        success: false,
        message: "Provide a name",
      });
    }

    const isExists = await classSchema.findOne({ className: className });

    if (isExists) {
      return res.status(400).json({
        success: false,
        message: "Class already exists",
      });
    }

    await classSchema.create({ className: className });

    return res.status(201).json({
      success: true,
      message: "class created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const admin = await userSchema.findById(req.uid);

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!admin.isAdmin) {
      return res.status(400).json({
        success: false,
        message: "You are not admin",
      });
    }

    const { classId } = req.body;

    if (!classId) {
      return res.status(400).json({
        success: false,
        message: "Provide a class",
      });
    }

    const targetClass = await classSchema.findById(classId);

    if (!targetClass) {
      return res.status(400).json({
        success: false,
        message: "Class Not Found",
      });
    }

    await classSchema.deleteOne({ _id: classId });

    return res.status(201).json({
      success: true,
      message: "class deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
