import { query } from '../db/index.js';
import fetch from "node-fetch";

/* The initial request to load all APIs and populate their responses */
export async function getApis() {
    const response = await query(`SELECT * FROM API_LIST INNER JOIN API_RESPONSE ON api_list.api_id=api_response.api_id`);

    let api;

    for(api of response.rows) {
      //  api.json = response.json(response);
       // console.log("api ",api);
        let get_success = false;
        const fetchResponse = await fetch(api.api_url);
        const json  = await fetchResponse.json();
        if(json != undefined) { get_success = true; } // not very good
      //  console.log("fetch: ", fetchResponse);
      //  console.log("THE DATA: ", json);
        updateApiResponse(json, get_success, fetchResponse.status, api.api_id);
    }

    const updatedResponse = await query(`SELECT * FROM API_LIST INNER JOIN API_RESPONSE ON api_list.api_id=api_response.api_id`);
    return response.rows;
}

/* Create a new API entry */
export async function createApi(api) {
    const response = await query(`INSERT INTO API_LIST (api_name, api_url, tags, doclink) VALUES ($1, $2, $3, $4) RETURNING *`, [api.api_name, api.api_url, api.tags, api.doclink]);
    const response2 = await query(`INSERT INTO API_RESPONSE (api_id) VALUES ($1) RETURNING *`,[response.rows[0].api_id]);
    return response.rows[0];
}

/* Update the API table */
export async function updateApiResponse(id, json, get_success, response_code) {
    //console.log(`response ${response_code}`);
    //console.log(`id ${id}`);
    const response = await query(`UPDATE API_RESPONSE SET json=$1, get=$2, response_code=$3 WHERE api_id=$4`, [id, json, get_success, response_code]);
}

//delete from an entry from both tables
export async function deleteApi(api){
    console.log("in delete api")
    const response = await query(`DELETE FROM API_LIST WHERE api_url= $1 RETURNING *`,[ api.api_url])
}
