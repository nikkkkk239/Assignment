import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
    home:{
        type:String,
    },
    office:{
        type:String,
    }
    ,
    family:{
        type:String
    },
    favorite:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true})
const Address = mongoose.model("address",addressSchema);
export default Address