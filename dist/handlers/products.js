"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("./../models/product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const products = new product_1.Products();
// Authorisation middleware
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];
        // console.log('Token received >> ', token);
        const verify = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401);
        res.json({ "message": error.message });
    }
};
// Get all products from db
const index = async (_req, res) => {
    try {
        const prods = await products.index();
        if (prods.length === 0) {
            res.json({ "message": "No products found !" });
        }
        else {
            res.json(prods);
        }
    }
    catch (error) {
        res.status(400);
        res.json({ "message": error.message });
    }
};
// Get product by id from db
const show = async (req, res) => {
    try {
        const id = req.params.id;
        const prod = await products.show(id);
        if (prod) {
            res.json(prod);
        }
        else {
            res.json({ "message": `No product found with id = ${id}` });
        }
    }
    catch (error) {
        res.status(400);
        res.json({ "message": error.message });
    }
};
// Create new product in the db
const create = async (req, res) => {
    try {
        const newProd = {
            name: req.body.name,
            price: req.body.price
        };
        const prodAdd = await products.create(newProd);
        // console.log('Product to add >> ',prodAdd);
        // const token = jwt.sign({product: newProd},process.env.TOKEN_SECRET!);
        // console.log('Token signed >>> ', token);
        res.json(prodAdd);
    }
    catch (error) {
        res.status(400);
        res.json({ "message": error.message });
    }
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyToken, create);
};
exports.default = productRoutes;
