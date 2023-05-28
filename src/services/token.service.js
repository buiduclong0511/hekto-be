const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const configs = require("../configs");
const { TOKEN_TYPES } = require("../constants");
const { BlacklistToken } = require("../models");

const decodeToken = (token) => {
    return jwt.verify(token, configs.jwt.secret);
};

const createToken = (payload, ttl = Number(configs.jwt.ttl)) => {
    return jwt.sign(payload, configs.jwt.secret, { expiresIn: ttl, jwtid: uuidv4() });
};

const createAccessToken = (userId) => {
    return createToken({
        sub: userId,
        type: TOKEN_TYPES.ACCESS,
    });
};

const createRefreshToken = (userId) => {
    return createToken(
        {
            sub: userId,
            type: TOKEN_TYPES.REFRESH,
        },
        Number(configs.jwt.refreshTtl)
    );
};

const checkIsBlacklist = async (jti) => {
    const blacklistToken = await BlacklistToken.findOne({ where: { id: jti } });
    return !!blacklistToken;
};

module.exports = {
    createAccessToken,
    createRefreshToken,
    decodeToken,
    checkIsBlacklist,
};
