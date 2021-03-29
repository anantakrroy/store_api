import Client from '../database';

export type Order = {
    user_id: number,
    status: string
};

export class Orders {
    // Get all orders
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to show orders : ${err}`)
        }
    }

    // Get order by id
    async show(id: string): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to show order ${id} : ${err}`)
        }
    }

    // Create an order
    async create(order: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders(user_id,status) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [order.user_id, order.status]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to create new order : ${err}`)
        }
    }

    // Add products to an order
    async addProduct(quantity: number, order_id: number, product_id: number): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO order_products(quantity, order_id, product_id) VALUES($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [quantity, order_id, product_id]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to add product : ${product_id} to order : ${order_id}`);
        }
    }

    // Get current order by user
    async getOrder(user_id: string) : Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT order_id,user_id,product_id,quantity,status FROM orders INNER JOIN order_products ON orders.user_id=($1)';
            const result = await conn.query(sql,[user_id]);
            // console.log('Get order by user from db >> ', result);
            return result.rows;
        } catch (error) {
            // console.log(error);
            throw new Error(`Unable to get order for user : ${user_id}`);
        }
    }
}