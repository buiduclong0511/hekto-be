const { Sequelize } = require("sequelize");

const configs = require("../configs");

const sequelize = new Sequelize(configs.db.name, configs.db.username, configs.db.password, {
    host: configs.db.host,
    dialect: configs.db.dialect,
});

module.exports = sequelize;
