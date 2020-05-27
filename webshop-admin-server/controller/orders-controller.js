class OrdersController {
    constructor(orderService) {
        this.orderService = orderService;
    }

    receiveOrder(req,res) {
        const {name,email,address,items} = req.body;
        this.orderService.saveOrder(name,email,address,items);
        res.sendStatus(200);
    }

    async getAllOrders(req,res) {
        const orders = await this.orderService.getAllOrders();
        res.json(orders);
    }
}

module.exports = OrdersController;