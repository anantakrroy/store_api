import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { PG_HOST, PG_DB, PG_DB_TEST, PG_USER, PG_PWD, ENV } = process.env;

// console.log(PG_HOST, PG_DB, PG_DB_TEST, PG_USER, PG_PWD, ENV);
let Client:Pool = new Pool();

if (ENV === 'dev') {
    Client = new Pool({
        host: PG_HOST,
        user: PG_USER,
        database: PG_DB,
        password: PG_PWD
    })
}
if (ENV === 'test') {
    Client = new Pool({
        host: PG_HOST,
        user: PG_USER,
        database: PG_DB_TEST,
        password: PG_PWD,
    })
}
// console.log(Client);
export default Client;