const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    index: true,
  },
  course: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: String,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    enum: ["pdf", "doc", "image", "video", "other"],
    default: "pdf",
  },
  fileSize: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

notesSchema.index({ subject: 1, course: 1 });

const notesModel = mongoose.model("Notes", notesSchema);

module.exports = notesModel;
