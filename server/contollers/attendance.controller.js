const attendanceModel = require("../models/attendance.model");
const classModel = require("../models/class.model");

// Mark / Record Attendance for a live class session
const recordAttendance = async (req, res) => {
  try {
    const { classId, studentId, studentName, studentEmail, status, durationMinutes } = req.body;

    if (!classId || !studentId || !studentName || !studentEmail) {
      return res.status(400).json({ message: "Missing required attendance fields" });
    }

    // Check if attendance already recorded for this session
    let record = await attendanceModel.findOne({ classId, studentId });

    if (record) {
      record.leaveTime = new Date();
      if (durationMinutes) record.durationMinutes = durationMinutes;
      if (status) record.status = status;
      await record.save();
      return res.status(200).json({ message: "Attendance updated successfully", record });
    }

    const newAttendance = await attendanceModel.create({
      classId,
      studentId,
      studentName,
      studentEmail,
      status: status || "present",
      durationMinutes: durationMinutes || 0,
    });

    res.status(201).json({ message: "Attendance recorded successfully", record: newAttendance });
  } catch (err) {
    console.error("Error recording attendance:", err);
    res.status(500).json({ message: "Error recording attendance", error: err.message });
  }
};

// Get attendance report for a specific class
const getClassAttendance = async (req, res) => {
  try {
    const { classId } = req.params;
    const attendees = await attendanceModel.find({ classId }).sort({ recordedAt: -1 });
    res.status(200).json({
      message: "Class attendance fetched successfully",
      totalAttendees: attendees.length,
      attendees,
    });
  } catch (err) {
    console.error("Error fetching class attendance:", err);
    res.status(500).json({ message: "Error fetching class attendance", error: err.message });
  }
};

// Get attendance history for a specific student
const getStudentAttendanceHistory = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await attendanceModel
      .find({ studentId })
      .populate("classId", "title subject date")
      .sort({ recordedAt: -1 });

    res.status(200).json({
      message: "Student attendance history fetched successfully",
      totalClassesAttended: records.length,
      records,
    });
  } catch (err) {
    console.error("Error fetching student attendance history:", err);
    res.status(500).json({ message: "Error fetching student attendance history", error: err.message });
  }
};

module.exports = {
  recordAttendance,
  getClassAttendance,
  getStudentAttendanceHistory,
};
