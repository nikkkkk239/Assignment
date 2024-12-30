import User from "../models/auth.model.js";
import bcrypt from "bcrypt"
import { generateToken } from "../lib/generateToken.js";


export const signUp =async (req,res)=>{
    const {name,email,mobileNumber,password} = req.body;

    try {
        if(!name){
            return res.status(400).json({message : "Name is required."})
        }
        if(!email){
            return res.status(400).json({message : "Email is required."})
        }
        if(!mobileNumber){
            return res.status(400).json({message : "Mobile Number is required."})
        }
        if(!password){
            return res.status(400).json({message : "Password is required."})
        }
        if(password.length < 6){
            return res.status(400).json({message : "Password must be atleast 6 in length."})
        }
        const isUser = await User.findOne({email});
        if(isUser){
            return res.status(400).json({message : "Email already in use."})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = await User.create({
            name,
            mobileNumber,
            email,
            password:hashedPassword
        })
        generateToken(user._id,res);
        return res.status(201).json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error."})
    }
}
export const login =async (req,res)=>{
    const {email,password} = req.body;

    try {
        if(!email){
            return res.status(400).json({message : "Email is required."})
        }
        if(!password){
            return res.status(400).json({message : "Password is required."})
        }
        const isUser = await User.findOne({email});
        if(!isUser){
            return res.status(404).json({message : "No user found."})
        }
        const isPasswordCorrect = await bcrypt.compare(password,isUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Password is Incorrect."});
        }
        generateToken(isUser._id,res);

        return res.status(200).json(isUser);
    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
}
export const checkAuth = async(req,res)=>{
    try {
        const user = req.user;
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error.")
    }
}