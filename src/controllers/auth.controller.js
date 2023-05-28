const { userService, authService, tokenService } = require("../services");
const { resError, catchAsync } = require("../utils");

const register = catchAsync(async (req, res) => {
    const body = req.body;

    if (await userService.checkExistsEmail(body.email.trim())) {
        return res.status(409).json(resError(409, "Email was existed."));
    }

    const user = await userService.createUser({
        email: body.email.trim(),
        first_name: body.first_name.trim(),
        last_name: body.last_name.trim(),
        password: body.password.trim(),
    });

    const accessToken = tokenService.createAccessToken(user.id);
    const refreshToken = tokenService.createRefreshToken(user.id);

    return res.json({
        data: {
            access_token: accessToken,
            refresh_token: refreshToken,
        },
    });
});

const login = catchAsync(async (req, res) => {
    const body = req.body;

    const user = await userService.getUserByEmail(body.email);
    if (!user) {
        return res.status(401).json(resError(401, "Unauthenticated."));
    }

    const isValidPassword = await authService.comparePassword(body.password, user.password);
    if (!isValidPassword) {
        return res.status(401).json(resError(401, "Unauthenticated."));
    }

    const accessToken = tokenService.createAccessToken(user.id);
    const refreshToken = tokenService.createRefreshToken(user.id);

    return res.json({
        data: {
            access_token: accessToken,
            refresh_token: refreshToken,
        },
    });
});

const getCurrentUser = catchAsync(async (req, res) => {
    const user = req.user;

    const data = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        full_name: user.full_name,
    };

    return res.json({
        data,
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const user = req.user;
    const accessToken = tokenService.createAccessToken(user.id);
    const refreshToken = tokenService.createRefreshToken(user.id);

    return res.json({
        data: {
            access_token: accessToken,
            refresh_token: refreshToken,
        },
    });
});

const logout = catchAsync(async (req, res) => {
    return res.json({
        data: true,
        message: "Logged out.",
    });
});

module.exports = {
    register,
    login,
    getCurrentUser,
    refreshToken,
    logout,
};
