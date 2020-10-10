var express = require("express");
var router = express.Router();
var pg = require("pg");

const connection = require('../config/db.config')

router.get('/getObjectType', function (req, res, next) {
  /* const user_id = req.params.user_id */
  
  connection.query('SELECT * from fun_get_type_list_tab();', function (error, table) {
    if (!!error) {
      console.log("error in get object query" + error.stack);
    } else {
      console.log("table data ",table.rows) ;      
      res.send(table.rows);
    }
  });
});

module.exports = router;