import "../model/connection.js";
import productSchemaModel from "../model/product.model.js";
import url from 'url';
import path from 'path';
import rs from "randomstring";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export var save = async(req,res,next)=>{
    var productList = await productSchemaModel.find();
    var size = productList.length;
    var _id = (size==0)?1:productList[size-1]._id+1; 
    var picon = req.files.picon;
    var piconnm = Date.now()+"-"+rs.generate(10)+"-"+picon.name;
    var uploadPath = path.join(__dirname,"../uploads/product-img",piconnm);
    var productDetails={...req.body,"piconnm":piconnm,"created_at":Date(),"_id":_id}
    
    try{
        await productSchemaModel.create(productDetails);
        picon.mv(uploadPath);
        res.status(201).json({"status":"product added successfully....."});
    }
    catch(error){
        res.status(500).json({"status":false,"error":error.message});
    }
}


export var fetch = async(req,res,next)=>{
    var condition_obj = req.query.condition_obj;
    var productList = await productSchemaModel.find(condition_obj);
    if (productList.length>0) {
        res.status(200).json({productList});
    }
    else
    res.status(500).json({"status":false,"data":"No details found !"});
}


export var update = async(req,res,next)=>{
    var condition_obj = JSON.parse(req.body.condition_obj);
    var content_obj = JSON.parse(req.body.content_obj);
    var productList = await productSchemaModel.find(condition_obj);
    if (productList.length>0) {
        var updateProduct = await productSchemaModel.updateMany(condition_obj,{$set:content_obj});
        res.status(200).json({"status":true,"data":updateProduct});
    }
    else
    res.status(500).json({"status":false,"data":"No details found !"});
    
}
export var deleteProduct = async(req,res,next)=>{
    var condition_obj = JSON.parse(req.body.condition_obj);
    var productList = await productSchemaModel.find(condition_obj);
    if (productList.length>0) {
        var deleteProduct = await productSchemaModel.deleteMany(condition_obj);
        res.status(200).json({"status":true,"data":deleteProduct});
    }
    else
    res.status(500).json({"status":false,"data":"No details found !"});
}