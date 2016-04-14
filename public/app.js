'use strict';

var jobApp = angular.module('jobApp', ['ngRoute', 'ngResource']); 


// ROUTES
jobApp.config(function ($routeProvider) {
    
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

    
});

// DIRECTIVE
jobApp.directive('addjobModal', function(){
    return {
        templateUrl: 'directives/addjobmodal.html',
        replace: true,
        scope: {
            
        }
    }
});



