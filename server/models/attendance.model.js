const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
    index: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
    index: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  joinTime: {
    type: Date,
    default: Date.now,
  },
  leaveTime: {
    type: Date,
  },
  durationMinutes: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["present", "absent", "late"],
    default: "present",
  },
  recordedAt: {
    type: Date,
    default: Date.now,
  },
});

// Composite indexes for fast lookups per class and student
attendanceSchema.index({ classId: 1, studentId: 1 });
attendanceSchema.index({ classId: 1, recordedAt: -1 });

const attendanceModel = mongoose.model("Attendance", attendanceSchema);

module.exports = attendanceModel;
