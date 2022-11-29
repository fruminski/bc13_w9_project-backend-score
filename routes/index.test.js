import request from 'supertest'
import {app} from '../app.js';
import { pool } from '../db/index.js';
import {expect, test, jest} from '@jest/globals';
import {resetApisTable} from '../db/helpers'
import { response } from 'express';


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
    afterEach(() => {
        return resetApisTable();
      });
    test('Send POST request - receive back new API', async () => {
        const response = await request(app).post('/api/')
        .set('Accept', 'application/json')
        .send({api_name: 'TestAPI', api_url: 'test.co.uk', doclink: 'testdocs.co.uk', tags:null})
        expect(response.status).toEqual(201)
        expect(response.body).toStrictEqual({success:true, payload:{api_id: expect.any(Number), api_name: 'TestAPI', api_url: 'test.co.uk', doclink: 'testdocs.co.uk', tags:null}})
    })

})

describe('test the DELETE requests', ()=>{
    afterEach(() => {
        return resetApisTable();
      });
    test('Send DELETE request', async ()=>{
        const response = await request(app).delete('/api/50')
        console.log("response body:", response.body)
        expect(response.status).toEqual(404)
        expect(response.body).toStrictEqual({success: false, payload:expect.any(String)})
    })
    
    test('Send DELETE request', async ()=>{
        const response = await request(app).delete('/api/1')
        console.log("response body:", response.body)
        expect(response.status).toEqual(200)
        expect(response.body).toStrictEqual({success: true, payload:[
            {
              api_id: 1,
              api_name: 'Astronomy Picture of the Day',
              api_url: 'https://go-apod.herokuapp.com/apod',
              tags: null,
              doclink: 'https://go-apod.herokuapp.com/'
            }
          ]})
    })

    test('Send DELETE request', async ()=>{
        const response = await request(app).delete('/api/')
        console.log("response body:", response.body)
        expect(response.status).toEqual(404)
        
    })

})


afterAll(() => {
    pool.end()
})