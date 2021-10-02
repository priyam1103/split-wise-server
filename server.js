const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(cors());
require("./service/routes")(app)
mongoose.connect('mongodb://localhost:27017/splitwise', { useNewUrlParser: true })
    .then(() => {
    console.log("connected to db")
})

server.listen(process.env.PORT || 3000, () => {
    console.log("on port 3000")
})