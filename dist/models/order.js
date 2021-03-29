"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const database_1 = __importDefault(require("../database"));
class Orders {
    // Get all orders
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            return result.rows;
        }
        catch (err) {
            throw new Error(`Unable to show orders : ${err}`);
        }
    }
    // Get order by id
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to show order ${id} : ${err}`);
        }
    }
    // Create an order
    async create(order) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders(user_id,status) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [order.userId, order.status]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to create new order : ${err}`);
        }
    }
    // Add products to an order
    async addProduct(quantity, order_id, product_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO order_products(quantity, order_id, product_id) VALUES($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [quantity, order_id, product_id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to add product : ${product_id} to order : ${order_id}`);
        }
    }
    // Get current order by user
    async getOrder(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT order_id,user_id,product_id,quantity,status FROM orders INNER JOIN order_products ON orders.user_id=($1)';
            const result = await conn.query(sql, [userId]);
            // console.log('Get order by user from db >> ', result);
            return result.rows;
        }
        catch (error) {
            // console.log(error);
            throw new Error(`Unable to get order for user : ${userId}`);
        }
    }
}
exports.Orders = Orders;
