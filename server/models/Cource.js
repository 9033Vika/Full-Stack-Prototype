import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  //image
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subjectSchema",
    },
  ],
});

export default mongoose.model("courseSchema", courseSchema);
