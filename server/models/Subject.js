import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  //image
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "noteSchema",
    },
  ],
});

export default mongoose.model("subjectSchema", subjectSchema);
