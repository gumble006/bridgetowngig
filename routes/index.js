'use strict';

var express = require('express');
var router = express.Router();

var Job = require('../models/job');


//INDEX
router.get('/jobs', function(req, res) {
  Job.find({}, function(err, jobs) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(jobs);
  });
});


// CREATE
router.post("/jobs", function(req, res){
	var jobtype 		= req.body.jobtype,
		location		= req.body.location,
		geography		= req.body.geography,
		zipcode			= req.body.zipcode,
		jobtitle		= req.body.jobtitle,
		company			= req.body.company,
		description		= req.body.description,
		contact			= req.body.contact;

	var newJob = {
			jobtype: jobtype, 
			location: location,
			geography: geography, 
			zipcode: zipcode,
			jobtitle: jobtitle,
			company: company,
			description: description,
			contact: contact
			};

	Job.create(newJob, function(err, newAddition){
		if (err) {
			return res.status(500).json({ err: err.message });
		} else {
			console.log("newly created job!");
			console.log(newAddition)
			res.redirect("/app/index.html");
		}
	})
});

// router.post('/jobs', function(req, res) {
//   var job = req.body;
//   console.log(req.body);
//   Job.create(job, function(err, job) {
//     if (err) {
//       return res.status(500).json({ err: err.message });
//     }
//     res.json({ 'job': job, message: 'job Created:' + job });
//   });
// });



// UPDATE
// router.put('/jobs/:id', function(req, res) {
  	
// 	var id = req.params.id;
// 	var todo = req.body;
// 	if (job && job._id !== id) {
// 		return res.status(500).json({ err: "Ids don't match!" });
// 	}
	
// 	Todo.findByIdAndUpdate(id, job, {new: true}, function(err, job) {
// 	if (err) 
// 	  return res.status(500).json({ err: err.message });
// 	}
	
// 	res.json({ 'job': job, message: 'Todo Updated' });
	
// 	});

// });



router.put('/jobs/:id', function(req, res) {
  var id = req.params.id;
  var job = req.body;
  if (job && job._id !== id) {
    return res.status(500).json({ err: "Ids don't match!" });
  }
  Job.findByIdAndUpdate(id, job, {new: true}, function(err, job) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    console.log('job successfully updated.');
    res.json({ 'job': job, message: 'Job post updated' });
  });
});






// DESTROY
router.delete('/jobs/:id', function(req, res) {
  
  var id = req.params.id;
  
  Job.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Job posting deleted' });
  });
});

module.exports = router;