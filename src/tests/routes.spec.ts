import request from 'supertest';
import express, { Application } from 'express';
import server from '../server';

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
    });
    it('Test /users/:id GET route ', async () => {
        await request(server).get('/users/4')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async (res) => {
                expect(res).toBeTruthy;
            })
    });
});
describe('Test PRODUCTS routes >>> ', () => {
    it('Test /products POST route ', async () => {
        const product = {
            "name": "Doorbell",
            "price": 10.99
        };

        await request(server).post('/products')
            .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
            .send(product)
            .expect(200)
            .then(async (res) => {
                expect(res.body).toBeTruthy;
                // expect(res.body.name).toEqual("Doorbell");
                // expect(+res.body.price).toEqual(10.99);
            })
            .catch(err => console.error(err.message));
    });
});