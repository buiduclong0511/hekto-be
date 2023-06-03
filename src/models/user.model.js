const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../sequelize");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING,
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

User.addHook("beforeValidate", (user) => {
    user.fullName = user.firstName + " " + user.lastName;
});

User.addHook("beforeCreate", async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    user.password = hashedPassword;
});

module.exports = User;
