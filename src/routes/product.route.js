const express = require("express");

const { validate, upload } = require("../middleware");
const { productValidation } = require("../validations");
const { productController } = require("../controllers");
const { ApiError } = require("../utils");

const route = express.Router();

route.post("/", validate(productValidation.create), productController.store);
route.post(
    "/:id/images",
    upload({
        fileFilter: (req, file, cb) => {
            const mimetype = file.mimetype;
            if (!mimetype.includes("image/")) {
                return cb(new ApiError(422, "Image is invalid"), false);
            }
            return cb(null, true);
        },
        limits: { fieldSize: 5 * 1024 * 1024 },
    }).single("image"),
    productController.uploadImage
);
route.get("/:id", productController.show);

module.exports = route;
