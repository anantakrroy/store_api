import request from 'supertest';
import express, { Application } from 'express';
import server from '../../server';

describe('Test order routes >>> ', () => {
    let originalTimeout:number;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('Test /orders GET route ', (done) => {
        request(server).get('/orders')
            .expect(200, done)
            .expect('Content-Type', /json/)
    });
    it('Test /orders/:id GET route ', async () => {
        await request(server).get('/orders/4')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async(res) => {
                expect(res.body).toBeTruthy;
            })
            .catch(err => console.error(err.message));
    });
    it('Test /orders/users/:userId POST route ', async () => {
        const order = {
            "status": "completed",
        };

        await request(server).post('/orders/users/10')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
            .send(order)
            .expect(200)
            .then(async (res) => {
                expect(res.body).toBeTruthy;
                expect(res.body.status).toEqual("completed")
            })
            .catch(err => console.error(err.message));
    });
    it('Test /orders/:id/products POST route ', async () => {
        const order = {
            "productId": 1,
            "quantity":10
        };

        await request(server).post('/orders/1/products')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
            .send(order)
            .expect(200)
            .then(async (res) => {
                expect(res.body).toBeTruthy;
                expect(+res.body.product_id).toEqual(1);
                expect(+res.body.quantity).toEqual(10);
            })
            .catch(err => console.error(err.message));
    });
})