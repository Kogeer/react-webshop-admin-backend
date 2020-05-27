const Order = require('../ModelObjects/Order');

class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    saveOrder(name,email,address,items) {
        const mockId = 0;
        const order = new Order(mockId,name,email,address,items);
        this.orderRepository.saveOrder(order);
    }

    async getAllOrders() {
        return await this.orderRepository.getAllOrders();
    }
}

module.exports = OrderService;