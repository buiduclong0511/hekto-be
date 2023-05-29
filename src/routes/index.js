const authRoute = require("./auth.route");
const categoryRoute = require("./category.route");
const productRoute = require("./product.route");

const route = (app) => {
    app.use("/api/auth", authRoute);
    app.use("/api/categories", categoryRoute);
    app.use("/api/products", productRoute);
};

module.exports = route;
