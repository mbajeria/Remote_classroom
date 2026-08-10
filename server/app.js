const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 4000;
const DBConnection = require("./DB/DB.connection");
const studentRoute = require("./routes/student.route");
const teacherRoute = require("./routes/teacher.route");
const classRouter = require("./routes/class.route");
const cloudinary = require("cloudinary").v2
const fileUpload = require("express-fileupload");


DBConnection();

app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
     tempFileDir : '/tmp/'
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.use('/api/student', studentRoute);
app.use('/api/teacher', teacherRoute);
app.use("/api/class", classRouter);


app.get("/", (req,res) => {
    res.send("Remote Classroom For Rural Collages");
});

app.listen(port , () => {
    console.log(`App Running On This PORT ${port} Number`);
});