const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

const BlacklistToken = sequelize.define(
    "BlacklistToken",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        exp: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = BlacklistToken;
