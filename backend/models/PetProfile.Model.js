import mongoose from "mongoose";
const PetProfileSchema = new mongoose.Schema(
    {
        Petname: {
            type: String,
            required: true,
            minlength: 3,
        },
        category: {
            type: String,
            minlength: 3,
            required: true,
        },
        breed: {
            type: String,
            minlength: 3,
        },
        Age: {
            type: Number,
            minlength: 0,
            maxlength: 100,
        },
        sex: {
            type: String,
            enum: ["male","female"],
        },
        weight: {
            type: Number,
            minlength: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        medicalhistory: {
            type: String,
            minlength: 3,
        },
    },
    {timestamps: true}
);

const PetProfile = mongoose.model("PetProfile",PetProfileSchema);
export default PetProfile;