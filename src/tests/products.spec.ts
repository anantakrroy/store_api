// import request from 'supertest';
// import express, { Application } from 'express';
// import server from '../server';

// describe('Test PRODUCTS routes >>> ', () => {
//     // let originalTimeout:number = 50000;
//     // beforeEach(function() {
//     //     originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
//     //     jasmine.DEFAULT_TIMEOUT_INTERVAL = 65000;
//     // });

//     // afterEach(function() {
//     //   jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
//     // });
//     it('Test /products POST route ', async () => {
//         const product = {
//             "name": "Doorbell",
//             "price": 10.99
//         };

//         await request(server).post('/products')
//             .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
//             .send(product)
//             .expect(200)
//             .then(async (res) => {
//                 expect(res.body).toBeTruthy;
//                 // expect(res.body.name).toEqual("Doorbell");
//                 // expect(+res.body.price).toEqual(10.99);
//             })
//             .catch(err => console.error(err.message));
//     });
//     it('Test /products GET route ', (done) => {
//         request(server).get('/products')
//             .expect(200, done)
//             .expect('Content-Type', /json/)
//     });
//     it('Test /products/:id GET route ', async () => {
//         await request(server).get('/products/1')
//             .expect(200)
//             .expect('Content-Type', /json/)
//             .then(async (res) => {
//                 expect(res.body).toBeTruthy;
//                 // expect(res.body).toEqual({ id: 1, name: 'Doorbell', price: '10.99' });
//             })
//             .catch(err => console.error(err));
//     });
// })