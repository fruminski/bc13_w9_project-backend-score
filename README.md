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
| POST /apis/               | Missing/invalid request body        | 400             | { success: false, error: any string }                 |
| DELETE /apis/some_id      | none                                | 200             | { success: true, payload: deleted api object}         |
| PATCH /apis/some_id       | Parameters ** probably unnecessary  | 201             | { success: true, payload: updated api object}         |
|-------------------------------------------------------------------------------------------------------------------------------------------|
