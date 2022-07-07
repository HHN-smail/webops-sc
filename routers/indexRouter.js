const express = require("express");
const indexRouter = express.Router();

indexRouter.get("/", (req, res, next) => {
  res.render("index", { layout: false });
});

module.exports = indexRouter;
