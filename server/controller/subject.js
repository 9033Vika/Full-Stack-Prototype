import courseSchema from "../models/Cource.js";
import userSchema from "../models/User.js";
import subjectSchema from "../models/Subject.js";

export const getSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const parentCourse = await courseSchema.findById(id);

    if (!parentCourse) {
      return res.status(400).json({
        success: false,
        message: "Course doesn't exists",
      });
    }

    const records = await subjectSchema.find({
      _id: { $in: parentCourse.subjects },
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

export const addSubject = async (req, res) => {
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

    const { subjectName, price } = req.body;
    const { id } = req.params;

    if (!subjectName) {
      return res.status(400).json({
        success: false,
        message: "Provide a name",
      });
    }

    const parentCourse = await courseSchema.findById(id);

    if (!parentCourse) {
      return res.status(400).json({
        success: false,
        message: "Class doesn't exists",
      });
    }

    const records = await subjectSchema.find({
      _id: { $in: parentCourse.subjects },
    });

    let isExists = false;
    records.map((i) => {
      if (i.subjectName == subjectName) {
        isExists = true;
      }
    });

    if (isExists) {
      return res.status(400).json({
        success: false,
        message: "Course already exists",
      });
    }

    const newSubject = await subjectSchema.create({
      subjectName: subjectName,
      price: price,
    });

    parentCourse.subjects.push(newSubject._id);
    await parentCourse.save();

    return res.status(201).json({
      success: true,
      message: "subject created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteSubject = async (req, res) => {
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

    const { subjectId } = req.body;
    const { id } = req.params;

    if (!subjectId) {
      return res.status(400).json({
        success: false,
        message: "Provide a id",
      });
    }

    const parentCourse = await courseSchema.findById(id);

    if (!parentCourse) {
      return res.status(400).json({
        success: false,
        message: "Class doesn't exists",
      });
    }

    parentCourse.subjects = parentCourse.subjects.filter((i) => {
      return i._id.toString() !== subjectId;
    });

    await subjectSchema.deleteOne({ _id: subjectId });
    await parentCourse.save();

    return res.status(201).json({
      success: true,
      message: "subject deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
