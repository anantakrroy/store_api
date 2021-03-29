"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { PG_HOST, PG_DB, PG_DB_TEST, PG_USER, PG_PWD, ENV } = process.env;
let Client = new pg_1.Pool();
if (ENV === 'dev') {
    Client = new pg_1.Pool({
        user: PG_USER,
        database: PG_DB,
        password: PG_PWD,
        host: PG_HOST
    });
}
else if (ENV === 'test') {
    Client = new pg_1.Pool({
        user: PG_USER,
        database: PG_DB_TEST,
        password: PG_PWD,
        host: PG_HOST
    });
}
exports.default = Client;
