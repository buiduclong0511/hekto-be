const { authService, userService } = require("../services");

const verifyToken = async (req, res, next) => {
    const bearerToken = req.get("Authorization");

    if (bearerToken) {
        const token = bearerToken.split(" ")[1];

        try {
            const payload = authService.decodeToken(token);
            const user = await userService.getUserById(payload.sub);
            req.user = user;

            return next();
        } catch (err) {
            return res.status(401).json({
                code: 401,
                message: "Token was expired.",
            });
        }
    }

    return res.status(401).json({
        code: 401,
        message: "Unauthenticated.",
    });
};

module.exports = verifyToken;
