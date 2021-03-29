"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = process.env.SALT_ROUNDS || '';
const pepper = process.env.BCRYPT_PASSWORD;
class Users {
    // Get all users
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot fetch users ${err}`);
        }
    }
    // Show user by id
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Unable to show user ${id} : ${err.message}`);
        }
    }
    // Create new user
    async create(user) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users(first_name, last_name, password) VALUES ($1,$2,$3) RETURNING *';
            const hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [user.first_name, user.last_name, hash]);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Cannot create new user : ${err}`);
        }
    }
}
exports.Users = Users;
