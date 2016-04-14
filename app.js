'use strict';

var express 		= require('express'),
	bodyParser 		= require('body-parser'),
	app 			= express(),
	mongoose		= require('mongoose'),
	methodOverride  = require('method-override');

var indexRoutes 	= require('./routes/index');

var seedDB = require('./seeds');


// DATABASE CONNECT
mongoose.connect('mongodb://localhost/jobboard', function(err) {
  if (err) {
    console.log('Hey- Failed connecting to MongoDB');
  } else {
    console.log('Cool- Successfully connected to MongoDB');
  }
});



app.use(express.static(__dirname + "/public"));




app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// var urlencodedParser = bodyParser.urlencoded({ extended: false })



app.use(methodOverride("_method"));




seedDB();

app.use(indexRoutes);


var port = process.env.PORT || 3000;
app.listen(port, function (){
	console.log('Server running on ' + port);
});
