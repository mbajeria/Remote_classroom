const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
    trim: true,
  },
  currentYear: {
    type: Number, // Example: 1, 2, 3, 4
    required: true,
    min: 1,
    max: 5,
  },
  profileImage: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  role: {
    type: String,
    enum: ["student"],
    default: "student",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for fast lookup
studentSchema.index({ email: 1 });
studentSchema.index({ phone: 1 });
studentSchema.index({ course: 1, currentYear: 1 });

// Method to verify password
studentSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const studentModel = mongoose.model("Student", studentSchema);

module.exports = studentModel;

