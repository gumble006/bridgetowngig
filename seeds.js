var mongoose = require("mongoose");
var Job = require("./models/job");


var data = [
		{   
            jobtitle: "Java Engineer",
            company: "NetXposure, Inc.",
            zipcode: 97213,
            geography: "Southeast",
            description: "help us build and utilize API driven platforms for modern Web app development.",
            jobtype: "Full-time",
            location: "beaverton",
            contact: "greg@gmail.com"   
        },
        {   
            jobtitle: "Server",
            company: "Tech X",
            zipcode: 97216,
            geography: "Southwest",
            description: "Open source technologies and other cool stuff. Help us build and utilize API driven platforms for modern Web app development.",
            jobtype: "Full-time",
            location: "Hillsboro",
            contact: "greg@gmail.com"   
        },
        {   
            jobtitle: "Web Developer",
            company: "Code Fellows",
            zipcode: 97218,
            geography: "Northeast",
            description: "WordPress, open source technologies. Help us build and utilize API driven platforms for modern Web app development.",
            jobtype: "Part-time",
            location: "portland",
            contact: "greg@gmail.com"   
        }
];


function seedDB() {

	// remove taquerias
	Job.remove({}, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("removed jobs.");
		};

		data.forEach(function(seed){
			Job.create(seed, function(err, job){
				if(err) {
					console.log(err);
				} else {
					console.log("added job.");
				};
			});
		});
	});
};


module.exports = seedDB;