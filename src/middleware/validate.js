const { ApiError } = require("../utils");

const validate = (schema) => {
    return async (req, res, next) => {
        const body = req.body ?? {};
        const params = req.params ?? {};
        const values = {
            ...body,
            ...params,
        };

        try {
            await schema.validateAsync(values);
            next();
        } catch (err) {
            next(new ApiError(422, err.details[0].message));
        }
    };
};

module.exports = validate;
