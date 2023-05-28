const express = require("express");

const { validate } = require("../middleware");
const { categoryValidation } = require("../validations");
const { categoryController } = require("../controllers");

const route = express.Router();

route.post("/", validate(categoryValidation.create), categoryController.store);

module.exports = route;
