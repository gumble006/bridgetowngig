'use strict';

var angular = require('angular');

angular.module('jobApp') 

// DIRECTIVE
.directive('addjobModal', function(){
    return {
    	restrict: 'E',
        templateUrl: 'directives/addjobmodal.html',
        replace: true,
        controller: 'mainController'
    }
});