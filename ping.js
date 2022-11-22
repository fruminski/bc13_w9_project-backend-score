import { query } from './db/index.js';
/*
export async function ping(url) {
    const result = await ICMP.ping(url);
    console.log(result);
}
*/
import ping from 'node-ping';

async function testPing(host) {
    ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);
    });
}

testPing("www.google.com");
/*

import Canvas  from "canvas";
global.Image = Canvas.Image;

function pingUpdate(url) {
    var p = new Ping();

    p.ping(url)
    .then(data => {
        const response = await query(`SELECT api_id FROM api_list WHERE api_url=$1`, [url]);
        const api_id = response.api_id;

        console.log("Successful ping: " + data);
        const response = await query(`UPDATE api_response SET $1 WHERE api_id=$9 RETURNING *`, [ping]);
        return response.rows;

    })
    .catch(data => {
        console.error("Ping failed: " + data);
    })
}

pingUpdate("www.google.com");

*/