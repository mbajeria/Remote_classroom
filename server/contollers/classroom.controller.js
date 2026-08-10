const classModel = require("../models/class.model");

const createClassroom = async(req,res) => {
    const {fullName, title, subject, date, roomId} = req.body;
    try{
        if(!fullName || !title || !subject || !date || !roomId){
            return res.status(500).json({message:"All Fields Are Required"});
        }

        const newClass = await classModel.create({
            fullName,
            title,
            subject,
            date,
            roomId
        });

        res.status(201).json({message:"Class Created Successfully", newClass});

    }catch(err){
        res.status(500).json({messgae:"Error in Create Classroom"}, err);
        console.log("Error in Create Classroom", err);
    }
}



const AllClassess = async (req,res) => {
    try{
        const AllClassess = await classModel.find().sort({date: -1});
        res.status(200).json({message:"All Classes", AllClassess});
    }catch(err){
        res.status(500).json({message:"Error In Fetch All Classes"});
        console.log("Error in Fetch All Classes", err);
    }
} 



module.exports = {createClassroom, AllClassess}