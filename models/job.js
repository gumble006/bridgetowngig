'use strict';

var mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
	jobtitle: String,
    company: String,
    zipcode: Number,
    geography: String,
    description: String,
    jobtype: String,
    location: String,
    contact: String,
    created: {type: Date, default: Date.now}
});

var model = mongoose.model('Job', jobSchema);

module.exports = model;