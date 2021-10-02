const { Router } = require("express");
const express = require("express");
const route = express.Router();
const {addSplitUp,members,getSliptUps,addSplit,addMember} = require("../handlers/splitup")
const auth = require("../middleware/auth");
route.post("/addSplitUp", auth, addSplitUp)
route.get("/getMembers", auth, members);
route.get("/getSplitUps", auth, getSliptUps);
route.post("/addSplit", auth, addSplit);
route.post("/addMembers", auth, addMember);
module.exports = route;