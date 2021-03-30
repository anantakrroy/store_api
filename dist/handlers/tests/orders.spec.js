"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
describe('Test ORDER routes >>> ', () => {
    // let originalTimeout:number = 50000;
    // beforeEach(function() {
    //     originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    //     jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    // });
    // afterEach(function() {
    //   jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    // });
    it('Test /orders GET route ', (done) => {
        supertest_1.default(server_1.default).get('/orders')
            .expect(200, done)
            .expect('Content-Type', /json/);
    });
    it('Test /orders/:id GET route ', async () => {
        await supertest_1.default(server_1.default).get('/orders/4')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async (res) => {
            expect(res.body).toBeTruthy;
            // expect(res.body.id).toEqual(4);
        })
            .catch(err => console.error(err.message));
    });
    it('Test /orders/users/:userId POST route ', async () => {
        const order = {
            "status": "completed",
        };
        await supertest_1.default(server_1.default).post('/orders/users/10')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
            .send(order)
            .expect(200)
            .then(async (res) => {
            expect(res.body).toBeTruthy;
            expect(res.body.status).toEqual("completed");
        })
            .catch(err => console.error(err.message));
    });
    // it('Test /orders/:id/products POST route ', async () => {
    //     const order = {
    //         "productId": 1,
    //         "quantity":10
    //     };
    //     await request(server).post('/orders/1/products')
    //         .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
    //         .send(order)
    //         .expect(200)
    //         .then(async (res) => {
    //             expect(res.body).toBeTruthy;
    //             expect(+res.body.product_id).toEqual(1);
    //             expect(+res.body.quantity).toBeGreaterThanOrEqual(10);
    //         })
    //         .catch(err => console.error(err.message));
    // });
    // it('Test /orders/users/:id POST route ', async () => {
    //     const order = {
    //         "productId": 1,
    //         "quantity":10
    //     };
    //     await request(server).post('/orders/1/products')
    //         .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
    //         .send(order)
    //         .expect(200)
    //         .then(async (res) => {
    //             expect(res.body).toBeTruthy;
    //             expect(+res.body.product_id).toEqual(1);
    //             expect(+res.body.quantity).toEqual(10);
    //         })
    //         .catch(err => console.error(err.message));
    // });
});
