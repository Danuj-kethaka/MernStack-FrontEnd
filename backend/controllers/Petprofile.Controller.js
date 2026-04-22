import PetProfile from "../models/PetProfile.Model.js";
import mongoose from "mongoose";

export const createPetProfile = async(req,res) => {
    const data = req.body;
    if(!data.Petname || !data.category || !data.breed || !data.Age || !data.sex || !data.weight || !data.medicalhistory){
        return res.status(404).json({success:false, message: "please provide all fileds"});
    }
    try{
        const newPetProfile = new PetProfile({...data,user:req.user.id,});
        await newPetProfile.save();
        res.json(201).json({success: true,data:newPetProfile});
    }
    catch(error){
        console.error("Error in create new Pet Profile",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
};

export const getPetProfile = async (req,res) => {
    try{
        let petprofiles;

        if(req.user.role === "admin"){
            petprofiles = await PetProfile.find({});
        } else {
            petprofiles = await PetProfile.find({user: req.user.id});
        }

        res.status(200).json({success: true, data: petprofiles});
        }catch(error){
            console.log("error in fetching petprofiles: ", error.message);
            res.status(500).json({success: false, message: "Server Error"});
        }
};

export const updatePetProfile = async(req,res) => {
    const {id} = req.params;
    const petprofile = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({success:false,message: "Invalid User Id"});

    try{
        const updatePetProfile = await PetProfile.findByIdAndUpdate(id,petprofile,{new:true});
        res.status(200).json({success:true,data:updatePetProfile,message: "Pet Profile Updated Successfully"});
    }catch(error){
        res.status(500).json({success:false,message: "Server Error"});
    }
}

export const deletePetProfile = async(req,res) => {
    const{id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({success: false, message: "Invalid User ID"});

    try{
        await PetProfile.findByIdAndDelete(id);
        res.status(200).json({success:true,message: "Pet Profile Deleted Successfully"});
    }
    catch(error){
        res.status(500).json({success:false, message: "Server Error"});
    }
}