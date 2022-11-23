import express from "express";
import { createApi, getApis } from "../models/index.js";
const router = express.Router();

router.get("/", async function (req, res){
    const result = await getApis();
    console.log(result);
    if(result == undefined) { return res.json({success:false})}
    return res.json({success:true, payload: result})
    //return res.json({success:true, payload: '1-0 to the Scorers'})
})

router.post("/", async function(req, res){
    if(req.body == undefined) { return res.status(400).json({success:false})};
    const result = await createApi(req.body);
    return res.status(201).json({success:true, payload: result})
})

export {router};

