import { Order, Orders } from './../models/order';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const orders = new Orders();

// Authorisation middleware
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];
        const verify = jwt.verify(token, process.env.TOKEN_SECRET!);
        next();
    } catch (error) {
        res.status(401);
        res.json({"message" : error.message});
    }
}

const index = async (_req: Request, res: Response) => {
    try {
        const allOrders = await orders.index();
        if (allOrders.length === 0) {
            res.json({ "message": "No orders found!" });
        } else {
            res.json(allOrders);
        }
    } catch (error) {
        res.status(400);
        res.json({"message" : error.message});
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const showOrder = await orders.show(orderId);
        // console.log(`Order by id : ${orderId} : ${showOrder}`);
        if (showOrder) {
            res.json(showOrder);
        } else {
            res.json({
                "message": "No order found for id = " + orderId
            })
        }
    } catch (error) {
        res.status(400);
        res.json({"message" : error.message});
    }
}

const create = async (req: Request, res: Response) => {
    const newOrder = {
        user_id: +req.params.userId,
        status: req.body.status
    }
    try {
        const orderCreated = await orders.create(newOrder);
        // console.log('Order create >> ', orderCreated);
        res.json(orderCreated);
    } catch (error) {
        res.status(400);
        res.json({"message" : error.message});
    }
}

const addProduct = async (req: Request, res: Response) => {
    const orderId: number = +req.params.id;
    const prodId: number = req.body.productId;
    const quantity: number = req.body.quantity;
    try {
        const addProdToOrder = await orders.addProduct(quantity, orderId, prodId);
        // console.log(`Product create ${addProdToOrder} on order >> ${orderId}`);
        res.json(addProdToOrder);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json({"message" : error.message});
    }
}

const getOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const ordersByUser = await orders.getOrder(userId);
        if (ordersByUser.length !== 0) {
            res.json(ordersByUser);
        } else {
            res.json({
                'message': `No orders found for user with id  = ${userId}`
            })
        }
    } catch (error) {
        res.status(400);
        res.json({"message" : error.message});
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders/users/:userId', verifyToken, create);
    app.post('/orders/:id/products',verifyToken, addProduct);
    app.get('/orders/users/:userId', verifyToken, getOrder);
}

export default orderRoutes;