//Controlls the product lists
class ProductListController {
    constructor(productService) {
        this.productService = productService;
    }

    async products(req, res) {
        const productsArr = await this.productService.productsAll();
        // setTimeout(() => {
        //     res.json({products: productsArr})
        // },1)
        res.json({products: productsArr})

    }

}

module.exports = ProductListController;