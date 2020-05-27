const path = require('path')
const formidable = require('formidable');

class UpdateProductController {
  constructor(productService, repository, validationService, imagesService) {
    this.productService = productService;
    this.repository = repository
    this.validationService = validationService
    this.imagesService = imagesService
  }

  async productBySku(req, res) {
    let { sku } = req.params
    console.log(sku)
    if (this.repository.skuIsUsed(sku)) {
      const exactPath = path.resolve('uploads')
      const product = await this.productService.findBySku(sku)
      const imagesPath = await this.productService.imgsBySku(sku)
      console.log(imagesPath)
      imagesPath.forEach(path => { path.realPath = exactPath + path.imagePath })
      res.json({ "product": product, "imagesPath": imagesPath })
      return
    }
    res.json({ error: 'product is not exist' })

  }

  async updateProduct(req, res) {
    const { sku } = req.params
    const form = formidable({ multiples: true });
    let errorType = {};

    form.parse(req, async (err, fields, files) => {
      const { name, price, description, specs, stock, warn_at } = fields;
      console.log(fields);

      errorType = this.validationService.formValidation(name, price, description, specs);

      if (Object.keys(errorType).length > 0) {
        res.json(errorType)
        return;
      }

      if (err) {
        console.log(err);
      }

      this.productService.update({sku, name, price, description, specs, stock, warn_at})
      res.json(errorType)
    })
  }

  async updateImages(req, res) {
    const { sku } = req.params
    console.log(sku)

    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      const imagesPaths = this.imagesService.imageHandler(files, sku);
      const newList = await this.productService.updateImages(sku, imagesPaths)
      res.json({ newList })
    })


  }

  updatePrimary(req, res) {
    let { id } = req.params
    console.log('In controller', id)
    this.productService.changePrimary(id)
    res.json({});
  }

  async  delImageById(req, res) {
    let { id } = req.params
    const path = await this.productService.delImage(id)
    console.log(path)
    const result = this.imagesService.deleteImageByPath(path)
    if (result === undefined) res.json({})
    else res.json({ error: 'Deletion unsuccess' })
  }

  async deleteProduct(req, res){
    let {sku} = req.params
    const imagesArray = await this.productService.imgsBySku(sku)

    if(imagesArray.length){
      imagesArray.forEach(image =>{
        this.imagesService.deleteImageByPath(image.imagePath)
      })
    }
    this.imagesService.deleteFolder(`/${sku}`) // így üres mappa esetén is törli a felesleges mappát
    this.productService.delProduct(sku)
    
    res.json({})
  }
}



module.exports = UpdateProductController