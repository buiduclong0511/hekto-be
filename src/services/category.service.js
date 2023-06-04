const { Category } = require("../models");

const getCategoryById = async (id) => {
    return await Category.findOne({ where: { id } });
};

module.exports = {
    getCategoryById,
};
