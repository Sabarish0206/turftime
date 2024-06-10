import User from "../models/User.js";
import bcrypt from "bcryptjs"

export const getAllUsers = async(req,res,next) =>{
    let users;
    try{
        users = await User.find();
    } catch (err){
        return next(err);
    }

    if(!users){
        return res.status(500).json({messgage:"unexpected error occured"});
    }

    return res.status(200).json({users})
};

export const signup = async(req,res,next) =>{
    const {name,email,password}= req.body;
    if(!name && name.trim()==="" && !email && email.trim() === "" && !password && password.trim()===""){
        return res.status(422).json({messgage:"Invalid inputs"})
    }

    const hashedPassword = bcrypt.hashSync(password); 

    let user;
    try{
        user = new User({name,email,password:hashedPassword});
        user = await user.save();
    } catch (err){
        console.log(err);
    }
    if(!user){
        return res.status(500).json({messgage:"unexpected error occured"});
    }
    return res.status(201).json(({user}));


}