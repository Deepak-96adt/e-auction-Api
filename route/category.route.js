import express from "express";
var route=express.Router();

import * as categoryController from "../controller/category.controller.js";
route.post("/save",categoryController.save);
route.get("/fetch",categoryController.fetch);
route.patch("/update",categoryController.update);
route.delete("/delete",categoryController.deleteCategory);

export default route;