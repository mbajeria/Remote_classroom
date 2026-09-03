const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const teacherSchema = new mongoose.Schema({
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
  subjectSpecialization: {
    type: String,
    required: true,
    trim: true,
  },
  profileImage: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  role: {
    type: String,
    enum: ["teacher"],
    default: "teacher",
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

// Indexes for query optimization
teacherSchema.index({ email: 1 });
teacherSchema.index({ phone: 1 });
teacherSchema.index({ subjectSpecialization: 1 });

// Method to verify password
teacherSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const teacherModel = mongoose.model("Teacher", teacherSchema);

module.exports = teacherModel;

