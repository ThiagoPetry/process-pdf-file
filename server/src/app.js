const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const routes = require("./routes");

const app = express();
const limit = "500mb";

const server = app.listen();
server.setTimeout(60 * 1000);

app.use(bodyParser.urlencoded({ limit, extended: true }));
app.use(bodyParser.json({ limit }));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

app.use(fileUpload());

app.use(routes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server port: ${port}`);
});

module.exports = app;
