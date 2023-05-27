const express = require("express");

const { authController } = require("../controllers");
const { verifyToken } = require("../middleware");

const route = express.Router();

route.post("/register", authController.register);
route.post("/login", authController.login);
route.get("/current-user", verifyToken, authController.getCurrentUser);

module.exports = route;
