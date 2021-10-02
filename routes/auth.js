const express = require("express");
const route = express.Router();

const { authUser,addUsername } = require('../handlers/auth');
const auth = require("../middleware/auth")
route.post("/auth", authUser);
route.post("/addUsername", auth, addUsername);
module.exports = route;