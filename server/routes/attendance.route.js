const express = require("express");
const router = express.Router();
const {
  recordAttendance,
  getClassAttendance,
  getStudentAttendanceHistory,
} = require("../contollers/attendance.controller");

router.post("/record", recordAttendance);
router.get("/class/:classId", getClassAttendance);
router.get("/student/:studentId", getStudentAttendanceHistory);

module.exports = router;
