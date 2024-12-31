import userSchema from "../models/User.js";
import subjectSchema from "../models/Subject.js";
import noteSchema from "../models/Note.js";
import { uploadFileToCloudinary } from "../utils/uploadFileToCloudinary.js";

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;

    const parentSubject = await subjectSchema.findById(id);

    if (!parentSubject) {
      return res.status(400).json({
        success: false,
        message: "Note doesn't exists",
      });
    }

    const records = await noteSchema.find({
      _id: { $in: parentSubject.notes },
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

export const addNote = async (req, res) => {
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

    const { chapter } = req.body;
    const { id } = req.params;

    if (!chapter) {
      return res.status(400).json({
        success: false,
        message: "Provide a name",
      });
    }

    const parentSubject = await subjectSchema.findById(id);

    if (!parentSubject) {
      return res.status(400).json({
        success: false,
        message: "Subject doesn't exists",
      });
    }

    const records = await noteSchema.find({
      _id: { $in: parentSubject.notes },
    });

    let isExists = false;
    records.map((i) => {
      if (i.chapter == chapter) {
        isExists = true;
      }
    });

    if (isExists) {
      return res.status(400).json({
        success: false,
        message: "Note already exists",
      });
    }

    const newNote = await noteSchema.create({ chapter: chapter });

    parentSubject.notes.push(newNote._id);
    await parentSubject.save();

    return res.status(201).json({
      success: true,
      message: "note created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const addImages = async (req, res) => {
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

    const { id } = req.params;
    const files = req.files;

    console.log(files);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Provide an id",
      });
    }

    if (files.length < 1) {
      return res.status(400).json({
        success: false,
        message: "provide images",
      });
    }

    const parentNote = await noteSchema.findById(id);

    if (!parentNote) {
      return res.status(400).json({
        success: false,
        message: "Note doesn't exists",
      });
    }

    const images = await uploadFileToCloudinary(files);
    images.forEach((i) => {
      parentNote.images.push(i);
    });
    await parentNote.save();

    return res.status(201).json({
      success: true,
      message: "Images Inserted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const deleteNote = async (req, res) => {
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

    const { noteId } = req.body;
    const { id } = req.params;

    if (!noteId || !id) {
      return res.status(400).json({
        success: false,
        message: "Provide a id",
      });
    }

    const parentSubject = await subjectSchema.findById(id);

    if (!parentSubject) {
      return res.status(400).json({
        success: false,
        message: "Class doesn't exists",
      });
    }

    parentSubject.notes = parentSubject.notes.filter((i) => {
      return i._id.toString() !== noteId;
    });

    await noteSchema.deleteOne({ _id: noteId });
    await parentSubject.save();

    return res.status(201).json({
      success: true,
      message: "note deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
