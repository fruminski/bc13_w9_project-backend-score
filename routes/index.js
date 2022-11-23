import express from "express";
import { createApi, getApis, deleteApi } from "../models/index.js";
const router = express.Router();

router.get("/", async function (req, res){
    const result = await getApis();
    console.log(result);
    if(result == undefined) { return res.json({success:false})}
    return res.json({success:true, payload: result})
    //return res.json({success:true, payload: '1-0 to the Scorers'})
})

router.post("/", async function(req, res){

    /* test for empty body */
    if(JSON.stringify(req.body) === '{}') {
        res.status(400);
        return res.json({success:false});
    }
    const result = await createApi(req.body);
    return res.json({success:true, payload: result})
});

router.delete("/", async function(req, res){
    console.log(req.body.api_url)
const result = await deleteApi(req.body.api_url);
//if(JSON.stringify(req.body)=== '{}') {
  //  res.status(400);
    return res.json({success:true, payload: result})
//}
});



export {router};

