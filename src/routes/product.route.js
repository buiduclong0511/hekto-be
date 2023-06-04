const express = require("express");

const { productController } = require("../controllers");
const { verifyToken } = require("../middleware");

const route = express.Router();

route.get("/", productController.index);
route.get("/:id", productController.show);
route.post("/:id/like", verifyToken, productController.like);

module.exports = route;
