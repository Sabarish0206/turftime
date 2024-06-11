import Bookings from "../models/Bookings.js";

export const newBooking = async(req,res,next)=>{
    const {turf,date,slotNumber,user} = req.body;
    if(!turf || turf.trim() === "" ||
       !date || date.trim()===""||
       !slotNumber ||
       !user || user.trim() === "" ){
        return res.status(422).json({messgage:"Invalid inputs"})
    }

    let booking;
    try{
        booking =new Bookings({turf,
                date: new Date(date),
                slotNumber,user});
        booking = await booking.save();
    }catch(err){
        console.log(err);
    }
    if(!booking){
        return res.status(500).json({messgage:"unexpected error occured"});
    }
    return res.status(201).json(({booking}));
}



