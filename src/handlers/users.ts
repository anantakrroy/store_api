import { User, Users } from '../models/user';
import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const user = new Users();

// Authorisation middleware
const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];
        const verify = jwt.verify(token, process.env.TOKEN_SECRET!);
        next();
    } catch (error) {
        res.status(401);
        res.json(error);
    }
}

// Get all users from db
const index = async (_req: Request, res: Response) => {
    try {
        const users = await user.index();
        if (users.length === 0) {
            res.json({ "message": "No users found!" });
        } else {
            res.json(users);
        }
    } catch (error) {
        res.status(400);
        res.json({ "message": error.message });
    }
}

// Get user from db by user id
const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const showUser = await user.show(id);
        if (showUser) {
            res.json(showUser);
        } else {
            res.json({ "message": `No user found with id = ${id}` });
        }
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json({ "message": error.message });
    }
}

// Create a new user in the db
const create = async (req: Request, res: Response) => {
    const newUser: User = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        password: req.body.password
    }
    try {
        const userCreated = await user.create(newUser);
        const token = jwt.sign({ user: userCreated }, process.env.TOKEN_SECRET!);
        res.json(userCreated);
    } catch (error) {
        res.status(400);
        res.json({ "message": error.message });
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyToken, index);
    app.get('/users/:id', verifyToken, show);
    app.post('/users', verifyToken, create);
}

export default userRoutes;
