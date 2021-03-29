"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user = new user_1.Users();
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
        res.json(error);
    }
};
const index = async (_req, res) => {
    try {
        const users = await user.index();
        if (users.length === 0) {
            res.json({ "message": "No users found!" });
        }
        else {
            res.json(users);
        }
    }
    catch (error) {
        res.status(400);
        res.json({ "message": error.message });
    }
};
const show = async (req, res) => {
    try {
        const id = req.params.id;
        const showUser = await user.show(id);
        if (showUser) {
            res.json(showUser);
        }
        else {
            res.json({ "message": `No user found with id = ${id}` });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400);
        res.json({ "message": error.message });
    }
};
const create = async (req, res) => {
    const newUser = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        password: req.body.password
    };
    try {
        const userCreated = await user.create(newUser);
        const token = jsonwebtoken_1.default.sign({ user: userCreated }, process.env.TOKEN_SECRET);
        res.json(userCreated);
    }
    catch (error) {
        res.status(400);
        res.json({ "message": error.message });
    }
};
const userRoutes = (app) => {
    app.get('/users', verifyToken, index);
    app.get('/users/:id', verifyToken, show);
    app.post('/users', verifyToken, create);
};
exports.default = userRoutes;
