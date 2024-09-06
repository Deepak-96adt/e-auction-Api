import "../model/connection.js";
import CategorySchemaModel from "../model/category.model.js";
import url from 'url';
import path from 'path';
import rs from "randomstring";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export var save = async (req, res, next) => {
    var categoryList = await CategorySchemaModel.find();
    var size = categoryList.length;
    var _id = (size == 0) ? 1 : categoryList[size - 1]._id + 1;

    var caticon = req.files.caticon;
    var caticonnm = Date.now()+"-"+rs.generate(10)+"-"+caticon.name;
    var uploadPath = path.join(__dirname,"../../UI/public/img/upload/category-icon",caticonnm);
    
    var categoryDetails = { ...req.body,"caticonnm":caticonnm, "_id": _id };
    try {
        await CategorySchemaModel.create(categoryDetails);
        caticon.mv(uploadPath);
        res.status(201).json({ "status": "category added successfully....." });
    }
    catch (error) {
        res.status(500).json({ "status": error.message });
    }
}


export var fetch = async (req, res, next) => {
    var condition_obj = req.query.condition_obj;
    var categoryDetails = await CategorySchemaModel.find(condition_obj);
    if (categoryDetails.length > 0)
        res.status(200).json({ categoryDetails });
    else
        res.status(500).json({ "response": "Requested resource not found...." });
}

export var update = async (req, res, next) => {
    var condition_obj = JSON.parse(req.body.condition_obj);
    var content_obj = JSON.parse(req.body.content_obj);
    var categoryDetails = await CategorySchemaModel.find(condition_obj);
    if (categoryDetails.length > 0) {
        var category = await CategorySchemaModel.updateMany(condition_obj, { $set: content_obj });
        if (category)
            res.status(200).json({ "response": "category updated successfully" });
        else
            res.status(500).json({ "response": "Server Error" });
    }
    else
        res.status(404).json({ "response": "Requested resource not found...." });

}

export var deleteCategory = async (req, res, next) => {
    var condition_obj = JSON.parse(req.body.condition_obj);
    var categoryDetails = await CategorySchemaModel.find(condition_obj);
    if (categoryDetails.length > 0) {
        var category = await CategorySchemaModel.deleteMany(condition_obj);
        if (category)
            res.status(200).json({ "response": "category deleted successfully" });
        else
            res.status(500).json({ "response": "server error" });
    }
    else {
        res.status(404).json({ "response": "Requested resource not found...." });
    }


}