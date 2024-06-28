import mongoose from "mongoose";
import Turf from "./Turf.js";

const bookingSchema = new mongoose.Schema({
    turf:{
        type:mongoose.Types.ObjectId,
        ref:"Turf",
        required:true,
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true,
    },
    slot:{
       type: mongoose.Types.ObjectId,
        ref: "Turf.slots",
        required: true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },

});

export default mongoose.model("Booking",bookingSchema);