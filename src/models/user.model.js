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
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING,
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
        tableName: "users",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

User.addHook("beforeValidate", (user) => {
    user.full_name = user.first_name + " " + user.last_name;
});

User.addHook("beforeCreate", async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    user.password = hashedPassword;
});

module.exports = User;
