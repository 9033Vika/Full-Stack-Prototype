import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  chapter: {
    type: String,
    required: true,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model("noteSchema", noteSchema);
