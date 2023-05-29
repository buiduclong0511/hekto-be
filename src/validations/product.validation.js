const Joi = require("joi");

const productValidation = {
    create: Joi.object({
        name: Joi.string().max(191).required(),
        description: Joi.string().max(1000).required(),
        category_id: Joi.number().required(),
        price: Joi.number().required(),
    }),
    uploadImage: Joi.object({
        is_thumbnail: Joi.number().required(),
    }),
};

module.exports = productValidation;