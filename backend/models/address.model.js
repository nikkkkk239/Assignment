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
    },
    recentSearches :[
        {type:String}
    ]
},{timestamps:true})

addressSchema.pre("save", function (next) {
  if (this.recentSearches.length > 3) {
    this.recentSearches = this.recentSearches.slice(-3); // Keep only the last 3 items
  }
  next();
});

const Address = mongoose.model("address",addressSchema);
export default Address