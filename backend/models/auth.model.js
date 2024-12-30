import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength : 6,
        required:true,
    },
    mobileNumber:{
        type:Number,
        required:true,
    },
    
},{timestamps:true})

const User = mongoose.model("users",userSchema);
export default User;