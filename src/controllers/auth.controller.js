const { registerSchema, loginSchema } = require("../validations");
const { userService, authService } = require("../services");

const register = async (req, res) => {
    const body = req.body;

    try {
        await registerSchema.validateAsync(body);
    } catch (err) {
        return res.status(422).json({
            code: 422,
            message: err.details[0].message,
        });
    }

    if (await userService.checkExistsEmail(body.email.trim())) {
        return res.status(409).json({
            code: 409,
            message: "Email was existed.",
        });
    }

    const user = await userService.createUser({
        email: body.email.trim(),
        first_name: body.first_name.trim(),
        last_name: body.last_name.trim(),
        password: body.password.trim(),
    });

    const accessToken = authService.createAccessToken(user.id);
    const refreshToken = authService.createRefreshToken(user.id);

    return res.json({
        data: {
            access_token: accessToken,
            refresh_token: refreshToken,
        },
    });
};

const login = async (req, res) => {
    const body = req.body;

    try {
        await loginSchema.validateAsync(body);
    } catch (err) {
        return res.status(422).json({
            code: 422,
            message: err.details[0].message,
        });
    }

    const user = await userService.getUserByEmail(body.email);
    if (!user) {
        return res.status(401).json({
            code: 401,
            message: "Unauthenticated.",
        });
    }

    const isValidPassword = await authService.comparePassword(body.password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({
            code: 401,
            message: "Unauthenticated.",
        });
    }

    const accessToken = authService.createAccessToken(user.id);
    const refreshToken = authService.createRefreshToken(user.id);

    return res.json({
        data: {
            access_token: accessToken,
            refresh_token: refreshToken,
        },
    });
};

const getCurrentUser = async (req, res) => {
    return res.json({
        data: req.user,
    });
};

module.exports = {
    register,
    login,
    getCurrentUser,
};
