const express = require("express");
const routes = express.Router();
const { userRegisterValidate } = require("../Utils/UserValidate");
const registerUser = require("../Controllers/AuthApis/Register");




// post APIS
routes.post(
  "/register",
  userRegisterValidate,
  registerUser
);

module.exports = { routes };
