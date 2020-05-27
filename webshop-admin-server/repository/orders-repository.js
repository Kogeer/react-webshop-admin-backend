const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('Orders.db');
const Order = require('../ModelObjects/Order');

class OrdersRepository {

    saveOrder(order) {
        db.serialize(function() {
            db.run("INSERT INTO orders (name,email,address,items) VALUES (?,?,?,?);",
            [order.name, order.email, order.address, JSON.stringify(order.item)]);
        })
    }

    createOrdersTable() {
        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, address TEXT, items TEXT);");
        })
    }

    getAllOrders() {
        return new Promise((resolve,reject) => {
            db.serialize(function() {
                db.all("SELECT * FROM orders",(err,orders) => {
                    const transformOrders = orders.map(order => {
                        return {
                            ...order,
                            items: JSON.parse(order.items)
                        }
                    })
                    const orderObjects = transformOrders.map(order => {
                        return new Order(order.id,order.name,order.email,order.address,order.items)
                    })
                    resolve(orderObjects)
                });
            })
        })
    }
}

module.exports = OrdersRepository;

