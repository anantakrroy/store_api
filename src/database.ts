import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { PG_HOST, PG_DB, PG_DB_TEST, PG_USER, PG_PWD, ENV } = process.env;

let Client:Pool = new Pool();

if (ENV === 'dev') {
    Client = new Pool({
        user: PG_USER,
        database: PG_DB,
        password: PG_PWD,
        host: PG_HOST
    })
}

if (ENV === 'test') {
    Client = new Pool({
        user: PG_USER,
        database: PG_DB_TEST,
        password: PG_PWD,
        host: PG_HOST
    })
}

export default Client;