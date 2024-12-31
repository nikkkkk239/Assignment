import Address from "../models/address.model.js";

export const getAddresses = async(req,res)=>{
    try {
        const userId  = req.user._id;
        const address = await Address.findOne({userId})
    
        return res.status(200).json(address);
    } catch (error) {
        console.log("Error in getAddresses :",error);
        return res.status(500).json({message:"Internal server error ."})
    }
}

export const addHome = async(req,res)=>{
    try {
        const {home} = req.body;
        const userId = req.user._id;

        const isAddress = await Address.findOne({userId});
        if(!isAddress){
            return res.status(404).json({message:"No details found."})
        }
        const updatedAddress = await Address.findOneAndUpdate({userId},{
            $set:{
                home:home
            }
        },{new:true})
        return res.status(200).json({address:updatedAddress})
    } catch (error) {
        console.log("Error in addHome :",error);
        return res.status(500).json({message:"Internal server error ."})
    }
}
export const addFamily = async(req,res)=>{
    try {
        const {family} = req.body;
        const userId = req.user._id;

        const isAddress = await Address.findOne({userId});
        if(!isAddress){
            return res.status(404).json({message:"No details found."})
        }
        const updatedAddress = await Address.findOneAndUpdate({userId},{
            $set:{
                family:family
            }
        },{new:true})
        return res.status(200).json({address:updatedAddress})
    } catch (error) {
        console.log("Error in addFamily :",error);
        return res.status(500).json({message:"Internal server error ."})
    }
}
export const addOffice = async(req,res)=>{
    try {
        const {office} = req.body;
        const userId = req.user._id;

        const isAddress = await Address.findOne({userId});
        if(!isAddress){
            return res.status(404).json({message:"No details found."})
        }
        const updatedAddress = await Address.findOneAndUpdate({userId},{
            $set:{
                office:office
            }
        },{new:true})
        return res.status(200).json({address:updatedAddress})
    } catch (error) {
        console.log("Error in addOffice :",error);
        return res.status(500).json({message:"Internal server error ."})
    }
}
export const addFavour = async(req,res)=>{
    try {
        const {favorite} = req.body;
        const userId = req.user._id;

        const isAddress = await Address.findOne({userId});
        if(!isAddress){
            return res.status(404).json({message:"No details found."})
        }
        const updatedAddress = await Address.findOneAndUpdate({userId},{
            $set:{
                favorite:favorite
            }
        },{new:true})
        return res.status(200).json({address:updatedAddress})
    } catch (error) {
        console.log("Error in addFavour :",error);
        return res.status(500).json({message:"Internal server error ."})
    }
}
export const addRecent = async(req,res)=>{
    try {
        const {address} = req.body;
        const userId = req.user._id;

        const isAddress = await Address.findOne({userId});
        if(!isAddress){
            return res.status(404).json({message:"No details found."})
        }
        const updatedAddress = await Address.findOneAndUpdate(
            { userId },
            {
                $push: {
                    recentSearches: {
                        $each: [address],
                        $slice: -3, 
                    },
                },
            },
            { new: true }
        );
        return res.status(200).json({address:updatedAddress})
    } catch (error) {
        console.log("Error in addFavour :",error);
        return res.status(500).json({message:"Internal server error ."})
    }
}
export const removeRecent = async(req,res)=>{
    try {
        const {address} = req.body;
        const userId = req.user._id;

        const isAddress = await Address.findOne({userId});
        if(!isAddress){
            return res.status(404).json({message:"No details found."})
        }
        const updatedAddress = await Address.findOneAndUpdate(
            { userId },
            {
                $pull: {
                    recentSearches:address,
                },
            },
            { new: true }
        );
        return res.status(200).json({address:updatedAddress})
    } catch (error) {
        console.log("Error in addFavour :",error);
        return res.status(500).json({message:"Internal server error ."})
    }
}