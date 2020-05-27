//Működéshez szükséges dolgok
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Repository = require('./repository/repository');
const ValidationService = require('./service/validation-service');
const NewProductController = require('./controller/new-product-controller');
const ProductService = require('./service/product-service');
const ImagesService = require('./service/images-service');
const ProductListController = require('./controller/product-list-controller');
const UpdateProductController = require('./controller/update-product-controller')
const SkuGenerator = require('./utils/sku-generator');
const OrdersController = require('./controller/orders-controller');
const OrderService = require('./service/order-service');
const OrdersRepository = require('./repository/orders-repository');

const app = express();
const port = 3050;

app.use(express.static('uploads'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const repository = new Repository();
const ordersRepository = new OrdersRepository();
const skuGenerator = new SkuGenerator();
const validationService = new ValidationService(repository,skuGenerator);
const productService = new ProductService(repository);
const imagesService = new ImagesService();
const orderService = new OrderService(ordersRepository);
const newProductController = new NewProductController(productService,validationService,imagesService);
const updateProductController = new UpdateProductController(productService, repository, validationService, imagesService)
const productListController = new ProductListController(productService);
const ordersController = new OrdersController(orderService);


app.post('/product', newProductController.uploadProduct.bind(newProductController));

app.get('/product/:sku', updateProductController.productBySku.bind(updateProductController)); 
app.put('/product/:sku', updateProductController.updateProduct.bind(newProductController));  
app.post('/product/:sku/files', updateProductController.updateImages.bind(newProductController));
app.put('/files/:id', updateProductController.updatePrimary.bind(updateProductController))
app.delete('/files/:id', updateProductController.delImageById.bind(updateProductController))
app.delete('/product/:sku', updateProductController.deleteProduct.bind(updateProductController))

app.get('/products', productListController.products.bind(productListController));

app.post('/sendorder', ordersController.receiveOrder.bind(ordersController));
app.get('/orders', ordersController.getAllOrders.bind(ordersController));

app.listen(port, () => {
    ordersRepository.createOrdersTable();
    repository.createProductsTable();
    console.log(`Example app listening at http://localhost:${port}`)
});