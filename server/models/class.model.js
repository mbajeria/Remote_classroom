const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  title: { type: String, required: true },
  subject: { type: String, required: true, index: true },
  date: { type: Date, required: true, index: true },    // scheduled date/time
  roomId: { type: String, index: true },                // room id
  status: {
    type: String,
    enum: ["scheduled", "live", "completed", "cancelled"],
    default: "scheduled",
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  createdAt: { type: Date, default: Date.now },
});

// Indexing for optimized queries
ClassSchema.index({ date: -1, subject: 1 });

const classModel = mongoose.model("Class", ClassSchema);

module.exports = classModel;

