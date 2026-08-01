const express = require("express");
const router = express.Router();
const { createClassroom, AllClassess } = require("../contollers/classroom.controller");



router.post("/create", createClassroom);
router.get("/all-classes", AllClassess);


module.exports = router;