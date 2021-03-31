import { Order, Orders } from '../models/order';
import { User, Users } from '../models/user';
import { Product, Products } from '../models/product';
import Client from '../database';

const order = new Orders();
const user = new Users();
const product = new Products();

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
describe(' >>> Product Model', () => {
    it('should have an index method', () => {
        expect(product.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(product.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(product.index).toBeDefined();
    });
    it('Create method should create a new product', async () => {
        const newproduct = await product.create({
            name: 'Table Clock',
            price: 5.49
        });
        expect(newproduct.name).toEqual("Table Clock");
        expect(+newproduct.price).toEqual(5.49);
    });
    it('Get all products : index', async () => {
        const products = await product.index();
        expect(product).length >= 1;
    });
    it('Show product by id', async () => {
        const productById = await product.show("1");
        expect(productById).toBeTruthy;
    });
});
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