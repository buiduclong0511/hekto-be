const authRoute = require("./auth.route");
const categoryRoute = require("./category.route");

const route = (app) => {
    app.use("/api/auth", authRoute);
    app.use("/api/categories", categoryRoute);
};

module.exports = route;
