'use strict';

var angular = require('angular');

angular.module('jobApp') 

.controller('mainController', ['$scope', '$http', '$log', '$route', 'filterService', 'dataService', 'Flash', function($scope, $http, $log, $route, filterService, dataService, Flash) {


    // Get list of jobs from database
    dataService.getJobs(function(response){
        $scope.posts= response.data;
        dataService.jobs = response.data;
    });    
 
    // Link with sidebar filters
    $scope.filter = filterService.filter;
    
    // $scope.$watch('filter', function() {
    //     filterService.filter = $scope.filter; 
    // });

    
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
            case 'Contract':
                return 4;
        }
    };

    // ADD JOB MODAL
    $scope.successAddAlert = function () {
        var message = '<strong>Success!</strong> New job post created.';
        var id = Flash.create('success', message, 2000, {class: 'custom-class', id: 'custom-id'}, true);
    };

    $scope.addJob = function(validform, newJob) {
        if (validform) { 
            dataService.addJob(newJob).then(function() {
                $scope.successAddAlert();
                $route.reload();
            }); 
        } else return;
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



.controller('secondController', ['$scope', '$http', '$log', 'filterService', 'dataService', '$routeParams', 'Flash', function($scope, $http, $log, filterService, dataService, $routeParams, Flash) {
    
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
    
    $scope.successEditAlert = function () {
        var message = '<strong>Success!</strong> Job post updated.';
        var id = Flash.create('success', message, 2000, {class: 'custom-class', id: 'custom-id'}, true);
    };

    $scope.updateJob = function(validform, editedJob) {
        if (validform) {
            $scope.dynamicURL = "#/jobs/" + $scope.editjob._id;

            dataService.updateJob(editedJob).then(function() {
                $scope.successEditAlert();
            }); 
        } else return;
    };


    // DELETE
    $scope.successDeleteAlert = function () {
        var message = '<strong>Success!</strong> Job post deleted.';
        var id = Flash.create('success', message, 2000, {class: 'custom-class', id: 'custom-id'}, true);
    };

    $scope.deleteJob = function(id) {
        dataService.deleteJob(id).then(function() {
            $scope.successDeleteAlert();
        });
    };

}]);