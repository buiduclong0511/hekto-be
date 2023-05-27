const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const configs = require("../configs");
const { TOKEN_TYPES } = require("../constants");

const comparePassword = async (plainPassword, encryptedPassword) => {
    return await bcrypt.compare(plainPassword, encryptedPassword);
};

const decodeToken = (token) => {
    return jwt.verify(token, configs.jwt.secret);
};

const createToken = (payload, ttl = Number(configs.jwt.ttl)) => {
    return jwt.sign(payload, configs.jwt.secret, { expiresIn: ttl });
};

const createAccessToken = (userId) => {
    return createToken({
        sub: userId,
        type: TOKEN_TYPES.ACCESS,
    });
};

const createRefreshToken = (userId) => {
    return createToken({
        sub: userId,
        type: TOKEN_TYPES.REFRESH,
    });
};

module.exports = {
    comparePassword,
    createAccessToken,
    createRefreshToken,
    decodeToken,
};
