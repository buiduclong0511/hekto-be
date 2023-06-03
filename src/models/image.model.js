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
        productId: {
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
        isThumbnail: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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

Product.hasMany(Image, {
    foreignKey: "productId",
    as: "images",
});
Image.belongsTo(Product, {
    foreignKey: "productId",
});

module.exports = Image;
