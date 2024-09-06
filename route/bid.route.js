import express from "express";
var route=express.Router();

import * as bidController from "../controller/bid.controller.js";
route.post("/save",bidController.save);
route.get("/fetch",bidController.fetch);
// route.patch("/update",categoryController.update);
// route.delete("/delete",categoryController.deleteCategory);

export default route;