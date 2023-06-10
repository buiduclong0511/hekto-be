const { productService, userService } = require("../services");
const { catchAsync } = require("../utils");

const show = catchAsync(async (req, res) => {
    const { id } = req.params;

    const data = await productService.getProductById(id);

    return res.json({
        data,
    });
});

const index = catchAsync(async (req, res) => {
    const data = await productService.paginate({
        limit: Number(req.query.limit),
        page: Number(req.query.page),
        search: req.query.search,
    });

    return res.json({
        data: data.docs,
        pages: data.pages,
        total: data.total,
    });
});

const like = catchAsync(async (req, res) => {
    const { id } = req.params;

    await productService.like(id, req.user);

    return res.json({
        data: true,
    });
});

const unlike = catchAsync(async (req, res) => {
    const { id } = req.params;

    await productService.unlike(id, req.user);

    return res.json({
        data: true,
    });
});

const getCombineProducts = catchAsync(async (req, res) => {
    const user = await userService.getUserByRequest(req);
    const featureProducts = await productService.getFeatureProducts(user);
    const latestProducts = await productService.getLatestProducts(user);
    const trendingProducts = await productService.getTrendingProducts(user);

    return res.json({
        data: {
            featureProducts,
            latestProducts,
            trendingProducts,
        },
    });
});

module.exports = {
    show,
    index,
    like,
    unlike,
    getCombineProducts,
};
