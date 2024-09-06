import express from "express";
var route=express.Router();

import * as subcategoryController from "../controller/subcategory.controller.js";
route.post("/save",subcategoryController.save);
route.get("/fetch",subcategoryController.fetch);
// route.patch("/update",subcategoryController.update);
// route.delete("/delete",subcategoryController.deleteCategory);

export default route;