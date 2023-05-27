const authRoute = require("./authRoute");

const route = (app) => {
    app.use("/api/auth", authRoute);
};

module.exports = route;
