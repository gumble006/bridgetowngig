'use strict';

var angular = require('angular');

angular.module('jobApp') 

.controller('mainController', ['$scope', '$http', '$log', 'filterService', 'dataService', function($scope, $http, $log, filterService, dataService) {


    // Get list of jobs from database
    dataService.getJobs(function(response){
        $scope.posts= response.data;
        dataService.jobs = response.data;
    });    
 
    // Link with sidebar filters
    $scope.filter = filterService.filter;
    $scope.$watch('filter', function() {
        filterService.filter = $scope.filter; 
    });

    // FILTER RESULTS
    $scope.getOptionsFor = filterService.getOptionsFor;
    $scope.filterByProperties = filterService.filterByProperties;

    // order filters for job type
    $scope.customOrder = function (item) {
        switch (item) {
            case 'Full-time':
                return 1;
            case 'Part-time':
                return 2;
            case 'Temporary':
                return 3;
        }
    };


    // PAGINATION
    $scope.itemsPerPage = 10;
    $scope.currentPage = 0;
    
    $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
          $scope.currentPage--;
        }
    };

    $scope.prevPageDisabled = function() {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function() { 
        // return Math.ceil($scope.posts.length/$scope.itemsPerPage)-1;
    };

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()) {
          $scope.currentPage++;
        }
    };

    $scope.nextPageDisabled = function() {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };


}])



.controller('secondController', ['$scope', '$http', '$log', 'filterService', 'dataService', '$routeParams', function($scope, $http, $log, filterService, dataService, $routeParams, Jobs) {
    
    //GET+DISPLAY INDIV. JOB
    $scope.job = {};

    dataService.showJob($routeParams.id, function(response){
        $scope.job = response.data;
        $scope.displayedJob = $scope.job;
        $scope.editjob = response.data;
    });   


    // // Displays by ID
    // var index = dataService.jobs.map(function(el) {
    //     return el._id;
    // }).indexOf($routeParams.id);

    
    // EDIT JOB
    $scope.dynamicURL = "";

    $scope.updateJob = function(validform, editedJob) {
        
        if (validform) {
            $scope.dynamicURL = "#/jobs/" + $scope.displayedJob._id;
           
            dataService.updateJob(editedJob).then(function() {
                console.log('Job post updated.')
            }); 
        } else return
    };

    // DELETE
    $scope.deleteJob = function(id) {
        dataService.deleteJob(id).then(function() {
            console.log('Job post deleted.')
        });
    };

}]);