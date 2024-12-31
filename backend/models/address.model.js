import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
    home:{
        type:String,
        default:""
    },
    office:{
        type:String,
        default:""

    }
    ,
    family:{
        type:String,
        default:""
    },
    favorite:{
        type:String,
        default:""
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
},{timestamps:true})
const Address = mongoose.model("address",addressSchema);
export default Address