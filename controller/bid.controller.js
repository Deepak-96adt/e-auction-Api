import "../model/connection.js";
import BidSchemaModel from "../model/bid.model.js";

export var save = async (req, res, next) => {

    var bidList = await BidSchemaModel.find();
    var size = bidList.length;
    var _id = (size == 0) ? 1 : bidList[size - 1]._id + 1;

    var bidDetails = { ...req.body,"info":Date(),"_id": _id };
    try {
        await BidSchemaModel.create(bidDetails);
        res.status(201).json({ "status": "bid added successfully....." });
    }
    catch (error) {
        res.status(500).json({ "status": error.message });
    }
}

export var fetch = async (req, res, next) => {
    var condition_obj = req.query.condition_obj;
    var bidDetails = await BidSchemaModel.find(condition_obj);
    if (bidDetails.length > 0)
        res.status(200).json({ bidDetails });
    else
        res.status(500).json({ "response": "Requested resource not found...." });
}

