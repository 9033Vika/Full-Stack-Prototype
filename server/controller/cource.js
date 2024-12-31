import classSchema from "../models/Class.js";
import courseSchema from "../models/Cource.js";
import userSchema from "../models/User.js";

export const getCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const parentClass = await classSchema.findOne({ _id: id });

    if (!parentClass) {
      return res.status(400).json({
        success: false,
        message: "Class doesn't exists",
      });
    }

    const records = await courseSchema.find({
      _id: { $in: parentClass.courses },
    });

    return res.status(201).json({
      success: true,
      records,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const addCouse = async (req, res) => {
  try {
    const user = await userSchema.findById(req.uid);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are not a valid User",
      });
    }

    if (!user.isAdmin) {
      return res.status(400).json({
        success: false,
        message: "You are not an admin",
      });
    }

    const { courseName } = req.body;
    const { id } = req.params;

    if (!courseName) {
      return res.status(400).json({
        success: false,
        message: "Provide a name",
      });
    }

    const parentClass = await classSchema.findById(id);

    if (!parentClass) {
      return res.status(400).json({
        success: false,
        message: "Class doesn't exists",
      });
    }

    const records = await courseSchema.find({
      _id: { $in: parentClass.courses },
    });

    let isExists = false;
    records.map((i) => {
      if (i.courseName == courseName) {
        isExists = true;
      }
    });

    if (isExists) {
      return res.status(400).json({
        success: false,
        message: "Course already exists",
      });
    }

    const newCourse = await courseSchema.create({ courseName: courseName });

    parentClass.courses.push(newCourse._id);
    await parentClass.save();

    return res.status(201).json({
      success: true,
      message: "cource created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteCouse = async (req, res) => {
  try {
    const user = await userSchema.findById(req.uid);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are not a valid User",
      });
    }

    if (!user.isAdmin) {
      return res.status(400).json({
        success: false,
        message: "You are not an admin",
      });
    }

    const { courseId } = req.body;
    const { id } = req.params;

    if (!courseId || !id) {
      return res.status(400).json({
        success: false,
        message: "Provide a id",
      });
    }

    const parentClass = await classSchema.findById(id);

    if (!parentClass) {
      return res.status(400).json({
        success: false,
        message: "Class doesn't exists",
      });
    }

    parentClass.courses = parentClass.courses.filter((i) => {
      return i._id.toString() !== courseId;
    });

    await courseSchema.deleteOne({ _id: courseId });
    await parentClass.save();

    return res.status(201).json({
      success: true,
      message: "cource deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
