// import request from 'supertest';
// import express, { Application } from 'express';
// import server from '../server';

// describe('Test USER routes >>> ', () => {
//     // let originalTimeout:number = 50000;
//     // beforeEach(function() {
//     //     originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
//     //     jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
//     // });

//     // afterEach(function() {
//     //   jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
//     // });
//     it('Test /users POST route ', async () => {
//         const user = {
//             "firstName": "Billy",
//             "lastName": "Bowden",
//             "password": "billy123"
//         };

//         await request(server).post('/users')
//             .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
//             .send(user)
//             .expect(200)
//             .then(async (res) => {
//                 expect(res.body).toBeTruthy;
//                 // expect(res.body.first_name).toEqual("Billy")
//             })
//             .catch(err => console.error(err.message));
//     });
//     it('Test /users GET route ', (done) => {
//         request(server).get('/users')
//             .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
//             .expect(200, done)
//             .expect('Content-Type', /json/)
//     });
//     it('Test /users/:id GET route ', async () => {
//         await request(server).get('/users/4')
//             .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2F0ZXIgQm90dGxlIiwicHJpY2UiOiIyLjk5In0.Flq3cKKZoTs8hWcAaTqJbvcAaJpb3FVi2IXU7rCzvvU', { type: 'bearer' })
//             .expect(200)
//             .expect('Content-Type', /json/)
//             .then(async(res) => {
//                 expect(res).toBeTruthy;
//             })
//     });
// })