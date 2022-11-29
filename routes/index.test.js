import request from 'supertest'
import {app} from '../app.js';
import { pool } from '../db/index.js';
import {expect, test, jest} from '@jest/globals';

test('Send GET request to database to return all an array APIs', async () =>{
    // Send a request to the server
    //    URL must be correct
    const response = await request(app).get('/api/').set('Accept', 'application/json')
    expect(response.status).toEqual(200);
    console.log(response.body)
//Checks if the response's body is an object with the structure: { success: true, payload: array }
    expect(response.body).toEqual({success: true, payload: expect.any(Array) });


}, 10000)





afterAll(() => {
    pool.end()
 })