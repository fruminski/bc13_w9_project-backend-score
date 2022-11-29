import express from "express";
import { createApi, getApis, deleteApi } from "../models/index.js";
const router = express.Router();

router.get("/", async function (req, res) {
  const result = await getApis();
  console.log("router.get(): result: ", result);
  if (result == undefined) {
    return res.json({ success: false });
  }
  return res.json({ success: true, payload: result });
  //return res.json({success:true, payload: '1-0 to the Scorers'})
});

router.post("/", async function (req, res) {
  console.log("router.post(): req.body: ", req.body);
  /* test for empty body */
  if (JSON.stringify(req.body) === "{}") {
    res.status(400);
    return res.json({ success: false });
  }
  const result = await createApi(req.body);
  if (result == undefined) {
    res.status(400);
    return res.json({ success: false });
  }
  return res.status(201).json({ success: true, payload: result });
});

router.delete("/:id", async function (req, res) {
  console.log("router.delete(): req.body: ", req.params.id);
  // if(req.params.api_id == undefined && req.body.api_id == undefined) {
  //     res.status(400);
  //     return res.json({success: false, payload: "Don't be a dingleberry... use param or json body"});
  // }
  const result = await deleteApi(req.params.id);
  console.log(result)
  if (result.length !== 0) {
    return res.status(200).json({ success: true, payload: result });
  } else {
    return res.status(404).json({ success: false, payload: "please enter an id that exists" });
    
  }
});

export { router };
