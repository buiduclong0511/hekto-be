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
        category_id: {
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
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "products",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

Category.hasMany(Product, {
    foreignKey: "category_id",
});
Product.belongsTo(Category, {
    foreignKey: "category_id",
});

module.exports = Product;
