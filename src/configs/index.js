require("dotenv").config();

const app = require("./app");
const db = require("./db");

const configs = {
    app,
    db,
};

module.exports = configs;
