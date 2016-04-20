'use strict';

var angular = require('angular');


var jobApp = angular.module('jobApp', ['ngRoute', 'ngResource', 'ngFlash']); 

require('./scripts/routes.js'); 
require('./scripts/directives.js');
require('./scripts/services.js');
require('./scripts/controllers.js');






