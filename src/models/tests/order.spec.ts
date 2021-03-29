import { Order, Orders } from '../order';

const order = new Orders();

describe(' >>> Order Model', () => {
    let originalTimeout:number;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
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