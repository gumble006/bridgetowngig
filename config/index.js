try {var configValues = require('./config.json')}
				   catch (e) {console.log('error')};

module.exports = {
	
	uri: function(login) {
		return login || configValues.uri;
	}

};
