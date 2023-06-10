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

    await user.addLikedProduct(product);
};

const unlike = async (productId, user) => {
    const product = await getProductById(productId);

    await user.removeLikedProduct(product);
};

const includeLikedProductAttr = (user = null) => {
    return [
        literal(`(EXISTS (SELECT id FROM ProductUser WHERE userId = ${user?.id || 0} AND productId = product.id))`),
        "liked",
    ];
};

const includeLikedUsersCountProductAttr = () => {
    return [literal(`(SELECT COUNT(*) FROM ProductUser WHERE productId = product.id)`), "likedUsersCount"];
};

const getFeatureProducts = async (user = null) => {
    const products = await Product.findAll({
        attributes: {
            include: [includeLikedProductAttr(user)],
        },
        limit: 4,
        include: {
            model: Image,
            as: "images",
            where: {
                isThumbnail: true,
            },
            limit: 1,
        },
    });

    return products;
};

const getLatestProducts = async (user = null) => {
    const products = await Product.findAll({
        attributes: {
            include: [includeLikedProductAttr(user)],
        },
        include: {
            model: Image,
            as: "images",
            where: {
                isThumbnail: true,
            },
            limit: 1,
        },
        limit: 6,
        order: [
            ["createdAt", "desc"],
            ["id", "desc"],
        ],
    });

    return products;
};

const getTrendingProducts = async (user = null) => {
    const products = await Product.findAll({
        attributes: {
            include: [includeLikedProductAttr(user), includeLikedUsersCountProductAttr()],
        },
        include: {
            model: Image,
            as: "images",
            where: {
                isThumbnail: true,
            },
            limit: 1,
        },
        limit: 4,
        order: [
            ["likedUsersCount", "desc"],
            ["createdAt", "desc"],
            ["id", "desc"],
        ],
    });

    return products;
};

module.exports = {
    getProductById,
    paginate,
    like,
    unlike,
    getFeatureProducts,
    getLatestProducts,
    getTrendingProducts,
};
