import Client from '../database';
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS || '';
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
    firstName: string,
    lastName: string,
    password: string
};

export class Users {
    // Get all users
    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot fetch users ${err}`);
        }
    }

    // Show user by id
    async show(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to show user ${id} : ${err.message}`);
        }
    }

    // Create new user
    async create(user: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users(first_name, last_name, password_digest) VALUES ($1,$2,$3) RETURNING *';

            const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [user.firstName, user.lastName, hash]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot create new user : ${err}`);
        }
    }
}