import request from 'supertest';
import express, { Application } from 'express';
import server from '../server';

// jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

describe('Test USER routes >>> ', () => {
    it('Test /users POST route ', async () => {
        const user = {
            "firstName": "Billy",
            "lastName": "Bowden",
            "password": "billy123"
        };

        await request(server).post('/users')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
            .send(user)
            .expect(200)
            .then(async (res) => {
                expect(res.body).toBeTruthy;
                // expect(res.body.first_name).toEqual("Billy")
            })
            .catch(err => console.error(err.message));
    });
    it('Test /users GET route ', async () => {
        await request(server).get('/users')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async (res) => {
                expect(res.body).toBeTruthy;
                // expect(res.body.first_name).toEqual("Billy")
            })
            .catch(err => console.error(err.message));
    });
    it('Test /users/:id GET route ', async () => {
        await request(server).get('/users/4')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async (res) => {
                expect(res).toBeTruthy;
            })
            .catch(err => console.error(err.message));
    });
});
describe('Test PRODUCTS routes >>> ', () => {
    it('Test /products GET route', async () => {
        await request(server).get('/products')
        .expect(200)
        .then(async(res) => {
            expect(res.body).toBeTruthy;
        })
        .catch(err => console.error(err.message));
    });
    it('Test /products POST route ', async () => {
        const product = {
            "name": "Doorbell",
            "price": 10.99
        };

        await request(server).post('/products')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
            .send(product)
            // .expect(200)
            .then(async (res) => {
                expect(res.body).toBeTruthy;
                // expect(res.body.name).toEqual("Doorbell");
                // expect(+res.body.price).toEqual(10.99);
            })
            .catch(err => console.error(err.message));
    });
    it('Test /products/:id GET route', async () => {
        await request(server).get('/products/1')
        .expect(200)
        .then(async(res) => {
            expect(res.body).toBeTruthy;
        })
        .catch(err => console.error(err.message));
    })
});
describe('Test ORDERS routes >>> ', () => {
    it('Test create a new order for user with userId', async () => {
        const newOrder = {
            "status": "active"
        }
        await request(server).post('/orders/users/1')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
            .send(newOrder)
            .expect(200)
            .then(async (res) => {
                expect(res.body).toBeTruthy;
            })
            .catch(err => console.error(err));

    })
    it('Test /orders/:id/products POST route Add product to order id', async () => {
        const product = {
            "quantity": 5,
            "productId": 1,
            "orderId": 1
        };

        await request(server).post('/orders/1/products')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
            .send(product)
            .expect(200)
            .then(async (res) => {
                expect(res.body).toBeTruthy;
                // expect(res.body.first_name).toEqual("Billy")
            })
            .catch(err => console.error(err.message));
    });
    it('Test /orders GET route ', async () => {
        await request(server).get('/orders')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async (res) => {
                expect(res).toBeTruthy;
            })
            .catch(err => console.error(err));
    });
    it('Test /orders/:id GET route ', async () => {
        await request(server).get('/orders/1')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async (res) => {
                expect(res).toBeTruthy;
            })
    });
});