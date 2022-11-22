import express from "express";
const router = express.Router();

router.get("/", async function (req, res){
    return res.json({success:true, payload: '1-0 to the Scorers'})
})

export {router};

