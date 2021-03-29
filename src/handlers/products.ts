import { Product, Products } from './../models/product';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const products = new Products();

// Authorisation middleware
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];
        // console.log('Token received >> ', token);
        const verify = jwt.verify(token, process.env.TOKEN_SECRET!);
        next();
    } catch (error) {
        console.log(error);
        res.status(401);
        res.json({"message" : error.message});
    }
}

const index = async (_req: Request, res: Response) => {
    try {
        const prods = await products.index();
        if(prods.length === 0) {
            res.json({"message":"No products found !"});
        } else {
            res.json(prods);
        }
    } catch (error) {
        res.status(400);
        res.json({"message" : error.message});
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const prod = await products.show(id);
        if(prod) {
            res.json(prod);
        } else {
            res.json({"message":`No product found with id = ${id}`});
        }
    } catch (error) {
        res.status(400);
        res.json({"message" : error.message});
    }
}

const create = async(req:Request, res:Response) => {
    try {
        const newProd: Product = {
            name: req.body.name,
            price: req.body.price
        }
        const prodAdd = await products.create(newProd);
        // console.log('Product to add >> ',prodAdd);
        // const token = jwt.sign({product: newProd},process.env.TOKEN_SECRET!);
        // console.log('Token signed >>> ', token);
        res.json(prodAdd);
    } catch (error) {
        res.status(400);
        res.json({"message" : error.message});
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products',verifyToken, create);
}

export default productRoutes;