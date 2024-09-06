import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const subcategorySchema = mongoose.Schema({
    _id:Number,
    catnm:{
        type:String,
        required:[true,"category name required"],
        lowercase:true,
        trim:true
    },
    subcatnm:{
        type:String,
        required:[true,"subcategory name required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    subcaticonnm:{
        type:String,
        required:[true,"category icon name required"],
        trim:true
    }
   
});

subcategorySchema.plugin(uniqueValidator);
const SubCategorySchemaModel = mongoose.model("e-auction-subcategory-data",subcategorySchema);
export default SubCategorySchemaModel;