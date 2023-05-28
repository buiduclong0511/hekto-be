const Joi = require("joi");

const registerSchema = Joi.object({
    email: Joi.string().email().max(191).required(),
    first_name: Joi.string().min(2).max(191).required(),
    last_name: Joi.string().min(2).max(191).required(),
    password: Joi.string().min(4).max(191).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().max(191).required(),
    password: Joi.string().min(4).max(191).required(),
});

module.exports = {
    registerSchema,
    loginSchema,
};