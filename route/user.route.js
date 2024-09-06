import express from "express";
var route=express.Router();

import * as userController from "../controller/user.controller.js";
route.post("/save",userController.save);
route.post("/login",userController.login);
route.get("/fetch",userController.fetch);
route.patch("/update",userController.update);
route.delete("/delete",userController.deleteUser);

export default route;