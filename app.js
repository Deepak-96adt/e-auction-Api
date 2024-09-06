import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

var app=express();

//configuration to fetch req body content : body parser middleware
//used to fetch req data from methods like : POST , PUT , PATCH , DELETE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// for cross origin
app.use(cors());

//for accept file data
app.use(fileUpload())

// to link router
import userRoute from "./route/user.route.js";
import categoryRoute from "./route/category.route.js";
import subcategoryRoute from "./route/subcategory.route.js";
import productRoute from "./route/product.route.js";
import bidRoute from "./route/bid.route.js";
import Gateway from "./controller/payment.controller.js";

//route level middleware to load specific task
app.use("/user",userRoute);
app.use("/category",categoryRoute);
app.use("/subcategory",subcategoryRoute);
app.use("/product",productRoute);
app.use("/bid",bidRoute);
app.post("/payment",Gateway);

app.listen(3001);
console.log("server connected successfully on port http://localhost:3001");