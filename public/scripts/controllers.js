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
        return Math.ceil($scope.posts.length/$scope.itemsPerPage)-1;
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
    
    // $http.get("/jobs/" + $routeParams.id).then(function(response){
    //     $scope.displayedJob = response.data;
    //     dataService.jobs = response.data;
    // });

    
    // Displays by ID
    var index = dataService.jobs.map(function(el) {
        return el._id;
    }).indexOf($routeParams.id);

    $scope.displayedJob = dataService.jobs[index];
    
    // console.log($scope.displayedJob.created);

    // UPDATE

    $scope.editjob = angular.copy(dataService.jobs[index]);

    $scope.updateJob = function(editedJob) {
        
        dataService.updateJob(editedJob).then(function() {
            console.log('Job post updated.')
        });

        dataService.jobs[index] = angular.copy(editedJob);
    };

    $scope.displayDate = function (date){
        console.log(date.toDateString());
    };
    
    // DELETE
    $scope.deleteJob = function(id) {
        dataService.deleteJob(id).then(function() {
            console.log('Job post deleted.')
        });
    };


}]);