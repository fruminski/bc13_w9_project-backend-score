DEPENDENCIES TO INSTALL

express ⚽️
pg ⚽️

DEV DEPENDENCIES

dotenv ⚽️
morgan ⚽️
nodemon ⚽️
jest ⚽️

- Create DB folder with pool creation ⚽️
- Make .env file and populate it with the correct PGSQL string variable ⚽️
- Create models folder (should require the Db/index) ⚽️
- Create public folder 🧨
- Create routes folder ⚽️
- Make .gitignore - should have node_modules and .env in it ⚽️
- Create app.js file ⚽️

- Set up the routing and middleware ⚽️
- Set up a model test to run a select * query and respond with the data ⚽️

API INTERFACE:

|-------------------------------------------------------------------------------------------------------------------------------------------|
| Request                   | Request body                        | Response status | Response body                                         |
| ------------------------- | ----------------------------------- | --------------- | ----------------------------------------------------- |
| GET /apis/                | none                                | 200             | { success: true, payload: an array of api objects}    | ⚽️
| POST /apis/               | { api_name, api_url, tags, doclink }| 201             | { success: true, payload: newly created api object }  | ⚽️
| POST /apis/               | Missing/invalid request body        | 400             | { success: false, error: any string }                 | ⚽️
| DELETE /apis/some_id      | none                                | 200             | { success: true, payload: deleted api object}         |
| PATCH /apis/some_id       | Parameters ** probably unnecessary  | 201             | { success: true, payload: updated api object}         |
|-------------------------------------------------------------------------------------------------------------------------------------------|

- Write functions/add the functionality to populate the API_RESPONSE table

Morning Plan 23/11/22

- Write SELECT statements to update the API_RESPONSE with sample JSON data ⚽️ , GET request true/false boolean ⚽️ , response code ⚽️ , (response body?) wrapped in function
- Add the above function to getAllApis() so that we populate all the rows of API_RESPONSE ⚽️
- Write the POST request with a missing body
- Write the DELETE request
- Test the output of response table with a non functioning URL in the apis table


Morning Plan 24/11/22:
-Handle errors-
    - If a url times out, server crashes - catch timeout and send error message
    - If API endpoint doesn't respond with JSON format, determine if JSON & respond with error message if not
-Write tests - using Jest & supertest
    - Unit tests for each route
    - Unit tests for the models   