"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const database_1 = __importDefault(require("../database"));
class Products {
    // Get all products
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Unable to fetch products: ${err}`);
        }
    }
    // Show product by id
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to show user ${id} : ${err.message}`);
        }
    }
    // Create new user
    async create(prod) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products(name, price) VALUES ($1,$2) RETURNING *';
            const result = await conn.query(sql, [prod.name, prod.price]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot create new user : ${err}`);
        }
    }
}
exports.Products = Products;
