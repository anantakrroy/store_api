"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("./../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const orders = new order_1.Orders();
const orderRoutes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders/users/:userId', verifyToken, create);
    app.post('/orders/:id/products', addProduct);
    app.get('/orders/users/:userId', verifyToken, getOrder);
};
// Authorisation middleware
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];
        const verify = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
        res.json({ "message": error.message });
    }
};
const index = async (_req, res) => {
    try {
        const allOrders = await orders.index();
        if (allOrders.length === 0) {
            res.json({ "message": "No orders found!" });
        }
        else {
            res.json(allOrders);
        }
    }
    catch (error) {
        res.status(400);
        res.json({ "message": error.message });
    }
};
const show = async (req, res) => {
    try {
        const orderId = req.params.id;
        const showOrder = await orders.show(orderId);
        console.log(`Order by id : ${orderId} : ${showOrder}`);
        if (showOrder) {
            res.json(showOrder);
        }
        else {
            res.json({
                "message": "No order found for id = " + orderId
            });
        }
    }
    catch (error) {
        res.status(400);
        res.json({ "message": error.message });
    }
};
const create = async (req, res) => {
    const newOrder = {
        userId: +req.params.userId,
        status: req.body.status
    };
    try {
        const orderCreated = await orders.create(newOrder);
        console.log('Order create >> ', orderCreated);
        res.json(orderCreated);
    }
    catch (error) {
        res.status(400);
        res.json({ "message": error.message });
    }
};
const addProduct = async (req, res) => {
    const orderId = +req.params.id;
    const prodId = req.body.productId;
    const quantity = req.body.quantity;
    try {
        const addProdToOrder = await orders.addProduct(quantity, orderId, prodId);
        // console.log(`Product create ${addProdToOrder} on order >> ${orderId}`);
        res.json(addProdToOrder);
    }
    catch (error) {
        console.log(error);
        res.status(400);
        res.json({ "message": error.message });
    }
};
const getOrder = async (req, res) => {
    try {
        const userId = req.params.userId;
        const ordersByUser = await orders.getOrder(userId);
        if (ordersByUser.length !== 0) {
            res.json(ordersByUser);
        }
        else {
            res.json({
                'message': `No orders found for user with id  = ${userId}`
            });
        }
    }
    catch (error) {
        res.status(400);
        res.json({ "message": error.message });
    }
};
exports.default = orderRoutes;
