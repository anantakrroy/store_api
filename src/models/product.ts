import Client from '../database';

export type Product = {
    name: string,
    price: number
};

export class Products {
    // Get all products
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to fetch products: ${err}`)
        }
    }

    // Show product by id
    async show(id: string): Promise<Product> {
        try {
            console.log('inside show product');
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to show user ${id} : ${err.message}`);
        }
    }

    // Create new user
    async create(prod: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO products(name, price) VALUES ($1,$2) RETURNING *';
            const result = await conn.query(sql, [prod.name, prod.price]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot create new user : ${err}`);
        }
    }
}