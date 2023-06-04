const { Op, literal } = require("sequelize");

const { Product, Image } = require("../models");
const { ApiError } = require("../utils");

const getProductById = async (id) => {
    const product = await Product.findOne({
        where: { id },
        attributes: {
            include: [[literal(`(SELECT COUNT(*) FROM ProductUser WHERE productId = product.id)`), "likedUsersCount"]],
        },
        include: [
            {
                model: Image,
                as: "images",
            },
        ],
    });

    if (!product) {
        throw new ApiError(404, "Product not found.");
    }

    return product;
};

const paginate = async ({ limit, page, search }) => {
    const data = await Product.paginate({
        page: page || 1,
        paginate: limit || 10,
        where: {
            name: {
                [Op.like]: `%${(search || "").trim()}%`,
            },
        },
        include: {
            model: Image,
            as: "images",
        },
    });

    return data;
};

const like = async (productId, user) => {
    const product = await getProductById(productId);

    await user.addProduct(product);
};

module.exports = {
    getProductById,
    paginate,
    like,
};
