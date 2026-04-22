import PetAdoption from "../models/PetAdoption.Model.js";
import mongoose from "mongoose";

export const createPetAdoption = async(req,res) => {
    const data = req.body;
    if(!data.Petname || !data.PetImage || !data.category || !data.breed || !data.Age || !data.sex || !data.weight || !data.medicalhistory){
        return res.status(404).json({success:false, message: "please provide all fileds"});
    }
    try{
        const newPetAdoption = new PetAdoption({...data,user:req.user.id,});
        await newPetAdoption.save();
        res.json(201).json({success: true, data:newPetAdoption});
    }
    catch(error){
        console.error("Error in create new Pet Adoption",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
}

export const getPetAdoption = async (req, res) => {
    try {
        let petAdoptions;
        if (req.user.role === "admin") {
            petAdoptions = await PetAdoption.find({});
        } else {
            petAdoptions = await PetAdoption.find({ user: req.user.id });
        }
        res.status(200).json({success: true,data: petAdoptions,});
    } catch (error) {
        console.log("error in fetching pet adoptions:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updatePetAdoption = async (req, res) => {
    const { id } = req.params;
    const petAdoption = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {return res.status(404).json({success: false,message: "Invalid Pet Adoption ID",});}

    try {
        const updatedPetAdoption = await PetAdoption.findByIdAndUpdate(id,petAdoption,{ new: true });
        res.status(200).json({success: true,data: updatedPetAdoption,message: "Pet Updated Successfully",});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deletePetAdoption = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {return res.status(404).json({success: false,message: "Invalid Pet Adoption ID",});
    }
    try {
        await PetAdoption.findByIdAndDelete(id);
        res.status(200).json({success: true,message: "Pet Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};