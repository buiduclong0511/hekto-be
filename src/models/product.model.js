const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");
const Category = require("./category.model");

const Product = sequelize.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
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

Category.hasMany(Product, {
    foreignKey: "categoryId",
});
Product.belongsTo(Category, {
    foreignKey: "categoryId",
});

module.exports = Product;
