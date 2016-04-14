'use strict';

angular.module('jobApp') 

.controller('landingpageController', ['$scope', '$http', '$log', 'filterService', 'dataService', function($scope, $http, $log, filterService, dataService) {

    

}])

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


}])

.controller('secondController', ['$scope', '$http', '$log', 'filterService', 'dataService', '$routeParams', function($scope, $http, $log, filterService, dataService, $routeParams) {
    
    // Displays by ID
    var index = dataService.jobs.map(function(el) {
        return el._id;
    }).indexOf($routeParams.id);

    $scope.displayedJob = dataService.jobs[index];
    
    

    // UPDATE

    $scope.editjob = angular.copy(dataService.jobs[index]);

    $scope.updateJob = function(editedJob) {
        
        dataService.updateJob(editedJob).then(function() {
            console.log('Job post updated.')
        });

        dataService.jobs[index] = angular.copy(editedJob);
    };

    

    // DELETE
    $scope.deleteJob = function(id) {
        dataService.deleteJob(id).then(function() {
            console.log('all done. ' + id )
        });
    };


}]);

