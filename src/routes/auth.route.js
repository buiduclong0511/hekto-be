const express = require("express");

const { authController } = require("../controllers");
const { verifyToken, validate, verifyRefreshToken } = require("../middleware");
const { authValidation } = require("../validations");

const route = express.Router();

route.post("/register", validate(authValidation.registerSchema), authController.register);
route.post("/login", validate(authValidation.loginSchema), authController.login);
route.get("/current-user", verifyToken, authController.getCurrentUser);
route.get("/refresh-token", verifyRefreshToken, authController.refreshToken);
route.get("/logout", verifyRefreshToken, authController.logout);

module.exports = route;
