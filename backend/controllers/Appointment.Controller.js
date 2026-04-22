import Appointment from "../models/Appointment.Model.js";
import mongoose from "mongoose";

export const createAppointment = async(req,res) => {
    const appointment = req.body;
    if(!appointment.petname || !appointment.date || !appointment.time || !appointment.mobilenumber || !appointment.category ||  !appointment.reason)
    {
        return res.status(404).json({success:false, message: "please provide all fileds"});
    }

    const newAppointment = new Appointment({...appointment,user:req.user.id,});

    try{
        await newAppointment.save();
        res.json(201).json({success: true,date:newAppointment});
    }
    catch(error){
        console.error("Error in create new Appointment",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
};

export const getAppointments = async (req, res) => {
  try {
    let appointments;

    if (req.user.role === "admin") {
      appointments = await Appointment.find({});
    } else {
      appointments = await Appointment.find({ user: req.user.id });
    }

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.log("error in fetching appointments:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const updateAppointment = async(req,res) => {
    const {id} = req.params;
    const status = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({success:false,message: "Invalid User Id"});

    try{
        const updateAppointment = await Appointment.findByIdAndUpdate(id,status,{new:true});
        res.status(200).json({success:true,data:updateAppointment,message: "Appointment Updated"});
    }catch(error){
        res.status(500).json({success:false,message:"Server Error"});
    }
}