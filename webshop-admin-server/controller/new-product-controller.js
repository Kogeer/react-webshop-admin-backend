//Működéshez szükséges dolgok
const formidable = require('formidable');

class NewProductController {
    constructor(productService, validationService, imagesService) {
        this.productService = productService;
        this.validationService = validationService;
        this.imagesService = imagesService;
    }

    async uploadProduct(req, res) {

        const form = formidable({ multiples: true });
        let errorType = {};

        form.parse(req, async (err, fields, files) => {
            const { sku, name, price, description, specs } = fields;

            errorType = this.validationService.formValidation(name, price, description, specs);
            const validSku = await this.validationService.skuValidation(sku, name);
            if (validSku === undefined) {
                errorType.sku = `already used`
            }

           if (Object.keys(errorType).length > 0) {
                res.json(errorType);
                return;
            }

            if (err) {
                console.log(err);
            }

            const imagesPaths = this.imagesService.imageHandler(files, validSku);
            this.productService.newProduct(validSku, name, price, description, specs, imagesPaths)

            res.json(errorType);
        })
    }

}

module.exports = NewProductController;