import Location from "../models/location.model.js";
export const saveLocation = async(req,res)=>{
    const {location} = req.body;
    try {
        if(!location){
            return res.status(400).json({message:"Location needed."})
        }  
        const isLocation = await Location.findOne({userId : req.user._id})
        if(!isLocation){
            const createdLocation = await Location.create({
                userId:req.user._id,
                lati:location.latitude,
                long :location.longitude,
            })
            return res.status(201).json({location:createdLocation})
        }
        const updatedLocation = await Location.findOneAndUpdate({userId:req.user._id},{
            $set:{lati:location.latitude,long:location.longitude}
        },{new:true})
        return res.status(201).json({location:updatedLocation})
    } catch (error) {
        return res.status(500).json({message:"Internal server error . "})
    }
}
export const getLocation = async(req,res)=>{
    const userId = req.user._id;
    try {
        const location =  await Location.findOne({userId})
        if(!location){
            return res.status(404).json({message:"No location."})
        }
        return res.status(200).json(location);
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
}