import express from "express";
import * as productController from "../controller/product.controller.js";
var route = express.Router();

route.post("/save",productController.save);
route.get("/fetch",productController.fetch);
route.patch("/update",productController.update);
route.delete("/delete",productController.deleteProduct);

export default route;