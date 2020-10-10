var pg = require("pg");
const { Pool, Client } = require('pg')

var connection = new pg.Pool({
  host:'dvue-ematrix-db1.postgres.database.azure.com',
  user:'matrxadmin@dvue-ematrix-db1',
  password:'eM@tr1x',
  database:'eMatrixArchival', 
  port:5432
});

connection.connect(function(error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Connected!:)");
  }
});
module.exports = connection;
