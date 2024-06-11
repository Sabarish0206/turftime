import mongoose from "mongoose";

const turfSchema = new mongoose.Schema({
    turfName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,       
    },
    price:{
        type: Number,
        required: true,
        min: [0, 'Price must be positive']
    },
    games:[{
        type:String,
        required:true,
    }],
    admin:{
        type:mongoose.Types.ObjectId,
        ref:"Admin",
    },
    bookings:[{
        type:String,
    }],
    posterUrl:{
        type:String,
        required:true,
    },
    featured:{
        type:Boolean,
    }

});

export default mongoose.model("Turf",turfSchema);