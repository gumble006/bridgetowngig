'use strict'; 

var angular = require('angular');

angular.module('jobApp')  


// ROUTES
.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        redirectTo: "/jobs"
    })
    
    .when('/jobs', {
        templateUrl: 'pages/searchresults.html',
        controller: 'mainController'
    })
    
    .when('/jobs/:id', {
        templateUrl: 'pages/job.html',
        controller: 'secondController'
    })

    .when('/jobs/:id/edit', {
        templateUrl: 'pages/editjob.html',
        controller: 'secondController'
    })

    .otherwise({
        redirectTo: '/jobs'
    })

    
});