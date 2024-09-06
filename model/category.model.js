import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const categorySchema = mongoose.Schema({
    _id:Number,
    catnm:{
        type:String,
        required:[true,"category name required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    caticonnm:{
        type:String,
        required:[true,"category icon name required"],
        trim:true
    }
   
});

categorySchema.plugin(uniqueValidator);
const CategorySchemaModel = mongoose.model("e-auction-category-data",categorySchema);
export default CategorySchemaModel;