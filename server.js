const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const route = require('./app/routes/router');
const route = require('./app/routes/router');
const app = express();

const connection = require('./app/config/db.config');
//console.log("token",token);
//app.use(require('morgan')('combined'));


// var mysql= require('mysql');
// var  pg = require("pg");
//const connection = require("../app/config/db.config");


var corsOptions = {
  origin: "https://testrg15tn.azurewebsites.net"
};


app.use(cors());
app.use("/routes",route);
// app.use("/routes",route);
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// app.post('/getSearchData', (req, res) => {
//   console.log("searched data",req.body.todo);
// })

// set port, listen for requests

// app.get('/getResponse', function (req, res, next) {
//   connection.query('SELECT * from fun_get_type_list_tab();', function (error, table) {
//     if (!!error) {
//       console.log("error in get object query" + error.stack);
//     } else {
//       console.log("table data ",table.rows) ;      
//       res.send(table.rows);
//     }
//   });
// });



// This is where your API methods are exposed

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

