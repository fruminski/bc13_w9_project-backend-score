import { query } from '../db/index.js';

export async function getApis() {
    const response = await query(`SELECT * FROM API_LIST INNER JOIN API_RESPONSE ON api_list.api_id=api_response.api_id`);
    return response.rows;
}

export async function createApi(api) {
    const response = await query(`INSERT INTO API_LIST (api_name, api_url, tags, doclink) VALUES ($1, $2, $3, $4) RETURNING *`, [api.api_name, api.api_url, api.tags, api.doclink]);
    const response2 = await query(`INSERT INTO API_RESPONSE (api_id) VALUES ($1) RETURNING *`,[response.rows[0].api_id]);
    return response.rows[0];
}