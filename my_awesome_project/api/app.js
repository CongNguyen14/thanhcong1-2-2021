var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);

// ------------connect db--------------

// get all person
const pool = require("./db.js");
app.use(express.json());

app.get("/test", async(req, res)=>{
  try {
    const all = await pool.query("SELECT * FROM person");
    res.json(all.rows);
  } catch (error) {
    console.log(error.message)
  }
})
// get a person

app.get("/test/:id", async (req, res)=>{
  const {id} = req.params;
  try {
    const person = await pool.query("SELECT * FROM person WHERE id = $1", [id]);
    res.json(person.rows[0])
  } catch (error) {
    console.log(error.message)
  }
})
//update
app.put("/test/:id", async (req, res)=>{

  try {
    const {id} = req.params;
    const {des} = req.body;
    
    const updatePerson = await pool.query("UPDATE person SET des = $1 WHERE id = $2", [des, id])
    res.json("person was updated")
  } catch (error) {
    console.log(error.message)
  }
})
//delete
app.delete("/test/:id", async (req, res)=>{
  try {
    const {id} =  req.params;
    const deletePerson = await pool.query("DELETE FROM person WHERE id = $1 ", [id])
    res.json("person was delete")
  } catch (error) {
    console.log(error.message)
  }
})

// create
app.post("/test", async (req, res)=>{
  try {
    const {des} = req.body;
    console.log(req.body)
    const newPerson = await pool.query("INSERT INTO person (des) VALUES ($1) RETURNING *", [des]);

    res.json(newPerson.rows[0])

  } catch (error) {
    console.log(error.message)
  }
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
