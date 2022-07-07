const formRouter = require("express").Router();
const pg_students_pool = require("../database_connections/pg_students");
const Form = require("../utilities/form_validation");
formRouter.get("/", (req, res, next) => {
  res.render("form_page", { layout: false });
});

formRouter.post("/register", (req, res, next) => {
  let insertQuery =
    "INSERT INTO USERS(name, name_salt, roll_number, branch, year, course, roll, mobile_number, password_store_schema, password, hostel) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11);";
  // let values = [];
  // values.push(req.body.name);
  // values.push(makeNameSalt());
  // let roll_number = req.body.roll_number;
  // values.push(roll_number);
  // values.push(roll_number.slice(0, 2));
  // values.push(roll_number.slice(2, 4));
  // values.push(roll_number.slice(4, 5));
  // values.push(roll_number.slice(5, 8));
  // values.push(req.body.mobile_number);
  // values.push(true);
  // values.push(password);
  // values.push(req.body.hostel);
  console.log(req.body);

  let values = new Form(
    req.body.name,
    req.body.roll_number,
    req.body.email,
    req.body.hostel,
    req.body.mobile_number,
    req.body.password_store_schema || "1",
    req.body.password
  ).getValuesList();
  if (value === false) {
    res.send("INVALID");
    return;
  }
  pg_students_pool.query(insertQuery, values, (err, res) => {
    if (err) {
      console.log("error " + err);
    } else {
    }
  });
});

formRouter.get("/select/:roll", async (req, res, next) => {
  if (req.params.roll.length == 2) {
    console.log(2);
    let selectQuery = `SELECT roll_number, hostel FROM USERS WHERE branch = $1 ORDER BY roll_number LIMIT 10`;
    let query_result = await pg_students_pool.query(selectQuery, [
      req.params.roll.slice(0, 2),
    ]);

    res.send(query_result["rows"]);
  } else if (req.params.roll.length == 4) {
    console.log(4);
    let selectQuery = `SELECT roll_number, hostel FROM USERS WHERE branch = $1 AND year = $2 ORDER BY roll_number LIMIT 10`;
    let query_result = await pg_students_pool.query(selectQuery, [
      req.params.roll.slice(0, 2),
      req.params.roll.slice(2, 4),
    ]);

    res.send(query_result["rows"]);
  } else if (req.params.roll.length == 5) {
    console.log(5);
    let selectQuery = `SELECT roll_number, hostel FROM USERS WHERE branch = $1 AND year = $2 AND course = $3 ORDER BY roll_number LIMIT 10`;
    let query_result = await pg_students_pool.query(selectQuery, [
      req.params.roll.slice(0, 2),
      req.params.roll.slice(2, 4),
      req.params.roll.slice(4, 5),
    ]);

    res.send(query_result["rows"]);
  } else if (req.params.roll.length == 8) {
    console.log(8);
    let selectQuery = `SELECT roll_number, hostel FROM USERS WHERE roll_number = $1  `;
    let query_result = await pg_students_pool.query(selectQuery, [
      req.params.roll,
    ]);

    res.send(query_result["rows"]);
  }
});

module.exports = formRouter;
