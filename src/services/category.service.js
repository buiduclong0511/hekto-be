const { Category } = require("../models");
const { ApiError } = require("../utils");

const createCategory = async (data) => {
    if (await checkExistedName(data.name.trim())) {
        throw new ApiError(409, "Category name was existed.");
    }

    return await Category.create({
        name: data.name.trim(),
        description: data.description.trim(),
    });
};

const checkExistedName = async (name) => {
    return !!(await Category.findOne({ where: { name } }));
};

module.exports = {
    createCategory,
};
