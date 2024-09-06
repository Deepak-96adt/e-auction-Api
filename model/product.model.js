import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    _id:Number,
    info:String,
    title:{
        type:String,
        required:[true,"title is required"],
        trim:true
    },
    catnm:{
        type:String,
        required:[true,"catnm is required"],
        trim:true
    },
    subcatnm:{
        type:String,
        required:[true,"subcatnm is required"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"description is required"],
        trim:true
    },
    baseprice:{
        type:String,
        required:[true,"baseprice is required"],
        trim:true
    },
    piconnm:{
        type:String,
        required:[true,"piconnm is required"],
        trim:true
    },
    useremail:{
        type:String,
        required:[true,"useremail is required"],
        trim:true
    }
});

const productSchemaModel = mongoose.model("e-auction-product-data",productSchema);

export default productSchemaModel;