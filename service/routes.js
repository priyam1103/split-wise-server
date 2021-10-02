const bodyParser = require("body-parser");
module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/api", require("../routes/auth"));
  app.use("/api/split", require("../routes/splitup"));
};
