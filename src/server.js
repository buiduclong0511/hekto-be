const express = require("express");

const configs = require("./configs");
const routes = require("./routes");
const sequelize = require("./sequelize");

const app = express();

app.use(express.json());

// Import routing
routes(app);

sequelize
    .authenticate()
    .then(() => {
        console.log("Database connected.");
    })
    .catch((err) => {
        console.log("err:", err);
    });

app.listen(configs.app.port, () => {
    console.log("App is running on port:", configs.app.port);
});
