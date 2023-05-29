const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize");
const Product = require("./product.model");

const Image = sequelize.define(
    "Image",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_thumbnail: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "images",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

Product.hasMany(Image, {
    foreignKey: "product_id",
    as: "images",
});
Image.belongsTo(Product, {
    foreignKey: "product_id",
});

module.exports = Image;
