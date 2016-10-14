// call the packages we need
const express = require('express');
const mongoose = require('mongoose');
const router = require('./server/routes');
const passport = require('passport');
require('dotenv').load();

const app = express();

const port = process.env.PORT || 8080;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// the mpromise is deprecated so had to plugin another library
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/docman');


app.use(cookieParser(process.env.SECRET)); // read cookieParser
app.use(bodyParser.json());

// REGISTER THE ROUTES
// all of the routes are prefixed with /api
router(app, passport);

// START THE server
app.listen(port);
console.log('Magic happens on port ', port);

module.exports = app;
