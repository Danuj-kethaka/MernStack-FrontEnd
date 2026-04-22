import mongoose from "mongoose";
const AppointmentSchema = new mongoose.Schema(
    {
        petname: {
            type: String,
            required: true,
            minlength: 3,
        },
        category:{
            type:String,
            minlength: 3,
            required:true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        mobilenumber:{
            type: String,
            required: true,
            minlength: 10,
            maxlength:10,
        },
        reason:{
           type:String,
           required:true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending","accepted","rejected"],
            default: "pending",
        }    
    },
    { timestamps: true }  
);

const Appointment = mongoose.model("Appointment",AppointmentSchema);
export default Appointment;