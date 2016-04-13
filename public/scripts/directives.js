'use strict';

var angular = require('angular');

angular.module('jobApp') 

// DIRECTIVE
.directive('addjobModal', function(){
    return {
        templateUrl: 'directives/addjobmodal.html',
        replace: true,
    }
});