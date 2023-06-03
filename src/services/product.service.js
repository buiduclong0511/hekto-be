const categoryService = require("./category.service");
const { Product, Image } = require("../models");
const { ApiError } = require("../utils");

const createProduct = async (data) => {
    if (!(await categoryService.getCategoryById(data.categoryId))) {
        throw new ApiError(422, "Category id is invalid.");
    }

    return await Product.create({
        name: data.name.trim(),
        description: data.description.trim(),
        categoryId: data.categoryId,
        price: data.price,
    });
};

const uploadImage = async (data) => {
    return await Image.create(data);
};

const getProductById = async (id) => {
    const product = await Product.findOne({
        where: { id },
        include: {
            model: Image,
            as: "images",
        },
    });

    if (!product) {
        throw new ApiError(404, "Product not found.");
    }

    return product;
};

module.exports = {
    createProduct,
    uploadImage,
    getProductById,
};
