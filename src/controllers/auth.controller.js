const register = async (req, res) => {
    return res.json({
        data: "register",
    });
};

const login = async (req, res) => {
    return res.json({
        data: "login",
    });
};

module.exports = {
    register,
    login,
};
