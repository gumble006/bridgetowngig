'use strict';

var mongoose = require('mongoose');

// todo.name
// todo.completed

var jobSchema = new mongoose.Schema({
	jobtitle: String,
    company: String,
    zipcode: Number,
    geography: String,
    description: String,
    jobtype: String,
    location: String,
    contact: String
});

var model = mongoose.model('Job', jobSchema);

module.exports = model;