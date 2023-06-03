const { productService } = require("../services");
const { catchAsync } = require("../utils");

const store = catchAsync(async (req, res) => {
    const body = req.body;

    const product = await productService.createProduct(body);

    return res.json({
        data: product,
        message: "Product was created.",
    });
});

const uploadImage = catchAsync(async (req, res) => {
    const { id } = req.params;
    const path = req.file.path.replace("public/", "");

    const image = await productService.uploadImage({
        productId: id,
        path,
        isThumbnail: req.body.isThumbnail,
    });

    return res.json({
        data: image,
        message: "Image was created.",
    });
});

const show = catchAsync(async (req, res) => {
    const { id } = req.params;

    const data = await productService.getProductById(id);

    return res.json({
        data,
    });
});

module.exports = {
    store,
    uploadImage,
    show,
};
