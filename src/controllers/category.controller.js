const { categoryService } = require("../services");
const { catchAsync } = require("../utils");

const store = catchAsync(async (req, res) => {
    const body = req.body;

    const category = await categoryService.createCategory(body);

    return res.json({
        data: category,
        message: "Category was created.",
    });
});

module.exports = {
    store,
};
