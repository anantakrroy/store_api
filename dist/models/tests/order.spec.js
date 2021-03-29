"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const order = new order_1.Orders();
describe(' >>> Order Model', () => {
    it('should have an index method', () => {
        expect(order.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(order.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(order.index).toBeDefined();
    });
    it('Create method should create a new order', async () => {
        const neworder = await order.create({
            user_id: 1,
            status: 'active'
        });
        expect(+neworder.user_id).toEqual(1);
        expect(neworder.status).toEqual("active");
    });
    it('Get all orders : index', async () => {
        const orders = await order.index();
        expect(order).length >= 1;
    });
    it('Show order by id', async () => {
        const orderById = await order.show("1");
        expect(orderById).toBeTruthy;
    });
});
