import { query } from '../db/index.js';
import fetch from "node-fetch";

/* The initial request to load all APIs and populate their responses */
export async function getApis() {
    const response = await query(`SELECT * FROM API_LIST INNER JOIN API_RESPONSE ON api_list.api_id=api_response.api_id`);

    let api;

    for(api of response.rows) {
        getApi(api);
    }


    const updatedResponse = await query(`SELECT * FROM API_LIST INNER JOIN API_RESPONSE ON api_list.api_id=api_response.api_id`);
    return updatedResponse.rows;
}

async function getApi(api) {
    console.log("getApi()");
    let json;
    let status;
    let get_success = false;
    
    let fetchResponse = await fetch(api.api_url);

    /*
    .then((fetchResponse) => {
        if(fetchResponse.ok) return fetchResponse
        else if (!fetchResponse.ok) return fetchResponse
        else throw new Error("Status code error: " + res.status)
    })
    .catch(err=>console.log('error log',err)); */
    
    //console.log('fetchResponse',fetchResponse)
    if (fetchResponse !== undefined) {
        try {
            JSON.parse(fetchResponse);
        } catch (e) {
            updateApiResponse(api.api_id, false, false, 404, false);
            return;
        }
        updateApiResponse(api.api_id, "", true, 200, true);
    }
}

/* Create a new API entry */
export async function createApi(api) {
    if(api.api_url.length <= 0 || api.api_name.length <= 0){ 
        return undefined;
    }
    const response = await query(`INSERT INTO API_LIST (api_name, api_url, tags, doclink) VALUES ($1, $2, $3, $4) RETURNING *`, [api.api_name, api.api_url, api.tags, api.doclink]);
    const response2 = await query(`INSERT INTO API_RESPONSE (api_id) VALUES ($1) RETURNING *`,[response.rows[0].api_id]);
    return response.rows[0];
}

/* Update the API table */
export async function updateApiResponse(id, json, get_success, response_code, response_status) {
    //console.log(`response ${response_code}`);
    //console.log(`id ${id}`);
    const response = await query(`UPDATE API_RESPONSE SET json=$1, get=$2, response_code=$3, response=$4 WHERE api_id=$5 RETURNING *`, [json, get_success, response_code, response_status, id]);
    return response.rows;
}

//delete from an entry from both tables
export async function deleteApi(id){
    console.log(`deleteApi(${id})`);
    const response = await query("DELETE FROM API_LIST WHERE api_id=$1 RETURNING *", [id]);
    return response.rows;
}
