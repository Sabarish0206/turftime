import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const addAdmin = async(req,res,next) =>{

    const {email,password} = req.body;

    if(!email || email.trim() === "" || !password || password.trim()===""){
        return res.status(422).json({messgage:"Invalid inputs"})
    }

    const alreadExist =await Admin.findOne({email});
    if(alreadExist){
        return res.status(422).json({message:"Admin already exist"});
    }

    const hashedPassword = bcrypt.hashSync(password)
    let admin;
    try{
    admin = new Admin({email,password:hashedPassword});
    admin = await admin.save();
    }catch(err){
        console.log(err);
    }

    if(!admin){
        return res.status(500).json({messgage:"unexpected error occured"});
    }
    return res.status(201).json({ message: "Admin created successfully", admin });

};
//////////////
export const adminLogin = async(req,res,next) => {
    const {email,password} = req.body;

    if(!email || email.trim() === "" || !password || password.trim()===""){
        return res.status(422).json({messgage:"Invalid inputs"})
    }
    let existingAdmin;
    try{
    existingAdmin = await Admin.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(!existingAdmin){
        return res.status(422).json({message:"User not found"});
    }


    const isCorrectPassword = bcrypt.compareSync(password,existingAdmin.password);

    if(!isCorrectPassword){
        return res.status(422).json({message:"Wrong Password"});
    }

    const token = jwt.sign({id:existingAdmin._id},process.env.TOKEN_KEY,{
        expiresIn:"7d",
    });

    return res.status(200).json({message:"Login Successfull",token,id:existingAdmin._id});
};
/////////////////
export const getAllAdmin = async(req,res,next) =>{
    let admin;
    try{
        admin = await Admin.find();
    } catch (err){
        return next(err);
    }

    if(!admin){
        return res.status(500).json({messgage:"unexpected error occured"});
    }

    return res.status(200).json({admin})
};