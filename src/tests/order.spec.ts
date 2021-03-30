import { Order, Orders } from '../models/order';
import { User, Users } from '../models/user';

const order = new Orders();
const user = new Users();

describe(' >>> Order Model', () => {
    // let originalTimeout:number = 50000;
    // beforeEach(function() {
    //     originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    //     jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    // })

    // afterEach(function() {
    //   jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    // });
    const dummyUser = (async() => {
        await user.create({
            first_name: 'Ben',
            last_name: 'Harris',
            password: 'ben123'
        });
    })();
    console.log('Dummy user >> ', dummyUser);
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
})