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
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "blacklist_tokens",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = BlacklistToken;
