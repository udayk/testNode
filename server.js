const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const route = require('./app/routes/router');
const route = require('./app/routes/router');
const app = express();

const connection = require('./app/config/db.config');
const passport = require('passport');
var BearerStrategy = require("passport-azure-ad").BearerStrategy;
//console.log("token",token);
//app.use(require('morgan')('combined'));


// var mysql= require('mysql');
// var  pg = require("pg");
//const connection = require("../app/config/db.config");
//var tenantID = '3dd8961f-e488-4e60-8e11-a82d994e183d';
//var clientID = '50863743-41d5-447c-8360-557baa765aa6';
//var appIdURI = 'api://50863743-41d5-447c-8360-557baa765aa6';

var tenantID = '8ae3bb6d-0b01-4fc7-8b21-2a95072cbc14';
var clientID = '7c35d2b9-6be0-4fb1-aa7b-43fdb9215ae4';
var appIdURI = 'api://7c35d2b9-6be0-4fb1-aa7b-43fdb9215ae4';

var options = {
    identityMetadata: "https://login.microsoftonline.com/" + tenantID + "/v2.0/.well-known/openid-configuration",
    clientID: clientID,
    issuer: "https://sts.windows.net/" + tenantID + "/",
    audience: appIdURI,
    loggingLevel: "info",
    passReqToCallback: false
};

var bearerStrategy = new BearerStrategy(options, function (token, done) {
    done(null, {}, token);
    console.log("token",token);
});


var corsOptions = {
  origin: "https://testrg15tn.azurewebsites.net/"
};


app.use(cors());
app.use("/routes",route);
// app.use("/routes",route);
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// passport authorization configuration
app.use(passport.initialize());
passport.use(bearerStrategy);

// This is where your API methods are exposed
app.get(
    "/routes",
    passport.authenticate("oauth-bearer", { session: false }),
    function (req, res) {
        var claims = req.headers['authorization'];
        console.log("Validated claims: ", JSON.stringify(claims));
        console.log("body text: ", JSON.stringify(req.body));
        res.status(200).json(claims);
    }
);

// This is where your API methods are exposed

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

