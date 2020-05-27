class Product{
    constructor(sku, name, price, description, specs, imagesPath, stock){
        this.sku = undefined || sku
        this.name  = undefined || name
        this.price = undefined || price
        this.description = undefined || description
        this.specs = undefined || specs
        this.imagesPath = undefined || imagesPath
        this.stock = stock;
    }
    
}

module.exports = Product