const Joi = require("joi");

const categoryValidation = {
    create: Joi.object({
        name: Joi.string().max(191).required(),
        description: Joi.string().max(1000).required(),
    }),
};

module.exports = categoryValidation;
