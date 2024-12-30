import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    lati:{
        type:Number,
        required:true,
    },long:{
        type:Number,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
})
const Location = mongoose.model("locations",locationSchema)
export default Location;