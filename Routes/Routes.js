const express = require("express");
const routes = express.Router();
const userRegisterValidate = require("../MiddleWares/UserValidate");
const registerUser = require("../Controllers/AuthApis/Register");
const loginUser = require("../Controllers/AuthApis/Login");
const addData = require("../Controllers/DataManageApis/AddData");
const tokenChecker = require("../MiddleWares/TokenChecker");
const getData = require("../Controllers/DataManageApis/GetData");

// post APIs
routes.post("/register", userRegisterValidate, registerUser);
routes.post("/login", loginUser);
routes.post("/add-data", tokenChecker, addData);

// get APIs
routes.get("/get-data", tokenChecker, getData);

module.exports = { routes };
