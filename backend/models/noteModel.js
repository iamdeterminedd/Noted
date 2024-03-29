import mongoose from 'mongoose';

// Define the schema for notes using Mongoose
const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Note = mongoose.model('notes', noteSchema);
