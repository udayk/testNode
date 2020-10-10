const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const route = require('./app/routes/router');
const app = express();


//console.log("token",token);
//app.use(require('morgan')('combined'));


// var mysql= require('mysql');
// var  pg = require("pg");
//const connection = require("../app/config/db.config");


var corsOptions = {
  origin: "https://testrg14n.azurewebsites.net"
};


app.use(cors());

// app.use("/routes",route);
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/getSearchData', (req, res) => {
//   console.log("searched data",req.body.todo);
// })

// set port, listen for requests


app.get('/getResponse', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send({ data: 'It works...response from server' })
});
// This is where your API methods are exposed

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

