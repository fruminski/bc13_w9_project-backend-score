import request from 'supertest'
import {app} from '../app.js';
import { pool } from '../db/index.js';
import {expect, test, jest} from '@jest/globals';
import {resetApisTable} from '../db/helpers'




test('Send GET request to database to return all an array APIs', async () =>{
    // Send a request to the server
    //    URL must be correct
    const response = await request(app).get('/api/').set('Accept', 'application/json')
    expect(response.status).toEqual(200);
    console.log(response.body)
//Checks if the response's body is an object with the structure: { success: true, payload: array }
    expect(response.body).toEqual({success: true, payload: expect.any(Array) });

}, 10000)

describe('POST Route Testing', ()=>{

    test('Send POST request - receive back new API', async () => {
        const response = await request(app).post('/api/')
        .set('Accept', 'application/json')
        .send({api_name: 'TestAPI', api_url: 'test.co.uk', doclink: 'testdocs.co.uk', tags:null})
        expect(response.status).toEqual(201)
        expect(response.body).toStrictEqual({success:true, payload:{api_id: expect.any(Number), api_name: 'TestAPI', api_url: 'test.co.uk', doclink: 'testdocs.co.uk', tags:null}})
    })
    afterEach(() => {
        return resetApisTable();
      });
})

afterAll(() => {
    pool.end()
})