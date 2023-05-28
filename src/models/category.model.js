const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");

const Category = sequelize.define(
    "Category",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
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
        tableName: "categories",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = Category;
