import "../model/connection.js";
import SubCategorySchemaModel from "../model/subcategory.model.js";
import url from 'url';
import path from 'path';
import rs from "randomstring";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export var save = async (req, res, next) => {
    var subcategoryList = await SubCategorySchemaModel.find();
    var size = subcategoryList.length;
    var _id = (size == 0) ? 1 : subcategoryList[size - 1]._id + 1;

    var subcaticon = req.files.subcaticon;
    var subcaticonnm = Date.now()+"-"+rs.generate(10)+"-"+subcaticon.name;
    var uploadPath = path.join(__dirname,"../../UI/public/img/upload/subcategory-icon",subcaticonnm);
    
    var subCategoryDetails = { ...req.body,"subcaticonnm":subcaticonnm, "_id": _id };
    try {
        await SubCategorySchemaModel.create(subCategoryDetails);
        subcaticon.mv(uploadPath);
        res.status(201).json({ "status": "SubCategory added successfully....." });
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ "status": error.message });
    }
}


export var fetch = async (req, res, next) => {
    var condition_obj = req.query.condition_obj;
    var categoryDetails = await SubCategorySchemaModel.find(condition_obj);
    if (categoryDetails.length > 0)
        res.status(200).json({ categoryDetails });
    else
        res.status(500).json({ "response": "Requested resource not found...." });
}

// export var update = async (req, res, next) => {
//     var condition_obj = JSON.parse(req.body.condition_obj);
//     var content_obj = JSON.parse(req.body.content_obj);
//     var categoryDetails = await SubCategorySchemaModel.find(condition_obj);
//     if (categoryDetails.length > 0) {
//         var category = await SubCategorySchemaModel.updateMany(condition_obj, { $set: content_obj });
//         if (category)
//             res.status(200).json({ "response": "category updated successfully" });
//         else
//             res.status(500).json({ "response": "Server Error" });
//     }
//     else
//         res.status(404).json({ "response": "Requested resource not found...." });

// }

// export var deleteCategory = async (req, res, next) => {
//     var condition_obj = JSON.parse(req.body.condition_obj);
//     var categoryDetails = await SubCategorySchemaModel.find(condition_obj);
//     if (categoryDetails.length > 0) {
//         var category = await SubCategorySchemaModel.deleteMany(condition_obj);
//         if (category)
//             res.status(200).json({ "response": "category deleted successfully" });
//         else
//             res.status(500).json({ "response": "server error" });
//     }
//     else {
//         res.status(404).json({ "response": "Requested resource not found...." });
//     }


// }