import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    turf:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true
    },
    slotNumber:{
        type:Number,
        required:true
    },
    user:{
        type:String,
        required:true,
    },

});

export default mongoose.model("Booking",bookingSchema);