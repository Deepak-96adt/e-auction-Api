import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// var url = process.env.LOCAL_DATABASE_URL;

var url = process.env.DATABASE_URL;
mongoose.connect(url);
console.log("mongodb connected successfully....");