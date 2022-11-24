import { query } from '../db/index.js';
import fetch from "node-fetch";

/* The initial request to load all APIs and populate their responses */
export async function getApis() {
    const response = await query(`SELECT * FROM API_LIST INNER JOIN API_RESPONSE ON api_list.api_id=api_response.api_id`);

    let api;
    let json;

    for(api of response.rows) {

        let get_success = false;
        //  
        let fetchResponse = await fetch(api.api_url)
        .then((fetchResponse) => {
            if(fetchResponse.ok) return fetchResponse
            else if (!fetchResponse.ok) return fetchResponse
            else throw new Error("Status code error: " + res.status)
        })
        .catch(err=>console.log('error log',err));
        
        console.log('fetchResponse',fetchResponse)
        if (fetchResponse !== undefined) {
           json  = await fetchResponse.json();
        } else {json = 'Error'
        fetchResponse = {}
        fetchResponse.status = false  
        }      
        console.log('id',api.api_id,'json', json,'get', get_success,'fetch status', fetchResponse.status)
            // console.log(data);
        updateApiResponse( api.api_id, json, get_success, fetchResponse.status);
        
        // if(json != undefined) { get_success = true; } // not very good
        
    }

    const updatedResponse = await query(`SELECT * FROM API_LIST INNER JOIN API_RESPONSE ON api_list.api_id=api_response.api_id`);
    return updatedResponse.rows;
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
export async function updateApiResponse(id, json, get_success, response_code) {
    //console.log(`response ${response_code}`);
    //console.log(`id ${id}`);
    const response = await query(`UPDATE API_RESPONSE SET json=$1, get=$2, response_code=$3 WHERE api_id=$4 RETURNING *`, [id, json, get_success, response_code]);
    return response.rows;
}

//delete from an entry from both tables
export async function deleteApi(id){
    console.log(`deleteApi(${id})`);
    const response = await query("DELETE FROM API_LIST WHERE api_id=$1 RETURNING *", [id]);
    return response.rows;
}
