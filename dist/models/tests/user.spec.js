"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const user = new user_1.Users();
describe(' >>> User Model', () => {
    it('should have an index method', () => {
        expect(user.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(user.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(user.index).toBeDefined();
    });
    it('Create method should create a new user', async () => {
        const newUser = await user.create({
            first_name: 'Ben',
            last_name: 'Harris',
            password: 'ben123'
        });
        expect(newUser.first_name).toEqual("Ben");
        expect(newUser.last_name).toEqual("Harris");
    });
    it('Get all users : index', async () => {
        const users = await user.index();
        expect(user).length >= 1;
    });
    it('Show user by id', async () => {
        const userById = await user.show("1");
        expect(userById).toBeTruthy;
    });
});
