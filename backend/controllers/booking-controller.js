import Bookings from "../models/Bookings.js";
import Turf from "../models/Turf.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const newBooking = async(req,res,next)=>{
    const {turf,date,slotNumber,user} = req.body;
    if(!turf || turf.trim() === "" ||
       !date || date.trim()===""||
       !slotNumber ||
       !user || user.trim() === "" ){
        return res.status(422).json({messgage:"Invalid inputs"})
    }

    let existingUser;
    let existingTurf;

    try {
        existingUser = await User.findById(user);
        existingTurf = await Turf.findById(turf);
    } catch (error) {
        console.log(error);
    }

    if(!existingUser){
        console.log("no user");
        return res.status(422).json({message:"User not found"})
    } 
    if(!existingTurf){
        console.log("no turf");
        return res.status(422).json({message:"Turf not found"})
    } 
    let booking;
    try{
        booking =new Bookings({turf,
                date: new Date(date),
                slotNumber,
                user});
        

        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.save({session});
        existingUser.bookings.push(booking);
        existingTurf.bookings.push(booking);
        await existingUser.save({session});
        await existingTurf.save({session});
        await session.commitTransaction();
    }catch(err){
        console.log(err);
    }
    if(!booking){
        return res.status(500).json({messgage:"unexpected error occured"});
    }
    return res.status(201).json(({booking}));
};

////////////////////////

export const getAllBooking = async(req,res,next) =>{
    let booking;
    try{
        booking = await Bookings.find();
    } catch (err){
        return next(err);
    }

    if(!booking){
        return res.status(500).json({messgage:"unexpected error occured"});
    }

    return res.status(200).json({booking})
};

///////////////////////

export const deleteBookingById = async(req,res,next) =>{
    const bookingId = req.params.id;
    let booking;
    try {
        booking = await Bookings.findByIdAndDelete(bookingId).populate("user turf");
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.turf.bookings.pull(booking);
        await booking.user.save({session});
        await booking.turf.save({session});
        session.commitTransaction();
    } catch (err) {
        console.log(err)
    }
    if(!booking){
        return res.status(400).json({message:"Booking not founnd"});
    }
    return res.status(200).json({message:"Deleted successfully"});
}





