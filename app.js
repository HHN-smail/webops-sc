const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const http = require("http");
const express = require("express");
const exphbs = require("express-handlebars");

const formRouter = require("./routers/formRouter");
const bodyParser = require("body-parser");
const logger = require("morgan");
const pg_pool = require("./database_connections/pg_students");

const indexRouter = require("./routers/indexRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("tiny"));

// app.set("view engine", "ejs");
// app.set("views", "views");

app.engine(
  ".ejs",
  exphbs.engine({ extname: ".ejs", partialsDir: "./views/partials/" })
);
app.set("view engine", ".ejs");
app.set("views", "./views");

app.use("/public", express.static("public"));

app.use("/", indexRouter);
app.use("/form", formRouter);

const http_server = http.createServer(app);

http_server.listen(80);
// require("http2").createServer(app).listen(80);
