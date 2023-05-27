const { User } = require("../models");

const createUser = async (data) => {
    const user = await User.create(data);

    return user;
};

const getUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

const checkExistsEmail = async (email) => {
    return !!(await getUserByEmail(email));
};

const getUserById = async (id) => {
    return await User.findOne({ where: { id } });
};

module.exports = {
    createUser,
    checkExistsEmail,
    getUserByEmail,
    getUserById,
};
