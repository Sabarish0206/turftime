import jwt from "jsonwebtoken";
import Turf from "../models/Turf.js";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

export const addTurf = async(req,res,next)=>{

    //checking the admin token
    const extractedToken =await req.headers.authorization.split(' ')[1];

    if(!extractedToken || extractedToken.trim() === ""){
        return res.status(404).json({message:"Token Not Found"});
    }

    //Verifying the token (valid or not)
    let adminId;
    jwt.verify(extractedToken,process.env.TOKEN_KEY,(err,decrypted)=>{
        if(err){
            return res.status(404).json({message:`${err.message}`});
        }else{
            adminId = decrypted.id;
            return;
        }
    });


    const {turfName,description,location,games,price,posterUrl,featured,slots} = req.body;

    if(!turfName || turfName.split() === "" ||
       !description || description.split() ==="" ||
       !location || location.split() ===""||
       !games ||
       !posterUrl || posterUrl.split() ==="" ||
       !featured ||
       !price ){
       return res.status(404).json({message:"Invalid Input"}); 
    }

    let turf;
    try{
        turf = new Turf({turfName,description,location,games,posterUrl,featured,price,admin:adminId,slots});
        
        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();
        await turf.save({session});
        adminUser.addedTurfs.push(turf);
        await adminUser.save({session});
        await session.commitTransaction();
    } catch (err){
        console.log(err);
    }

    if(!turf){
        return res.status(404).json({message:"Something went wrong"});
    }
    return res.status(200).json({message:"Turf created successfully"});

};



export const getAllTurf = async(req,res,next)=>{
   // const {location} = req.body;
    let turf;
    try{
        turf =await Turf.find()
    }catch(err){
        console.log(err);
    }
    if(!turf){
        return res.status(400).json({message:"No turfs found"})
    }
    return res.status(201).json({turf});

};



export const getTurfById = async(req,res,next)=>{
    const turfId = req.params.id;
    let turf;
        try{
        turf = await Turf.findById(turfId);
    }catch(err){
        console.log(err);
    }

    if(!turf){
        return res.status(400).json({message:"No turfs found"})
    }
    return res.status(201).json({turf});
}