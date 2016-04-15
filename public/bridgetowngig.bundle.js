webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);


	var jobApp = angular.module('jobApp', ['ngRoute', 'ngResource']); 

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);








/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

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

	    
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('jobApp') 

	// DIRECTIVE
	.directive('addjobModal', function(){
	    return {
	        templateUrl: 'directives/addjobmodal.html',
	        replace: true,
	    }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);


	angular.module('jobApp') 


	.service('filterService', function() {
	    
	    this.filter = {};
	    
	    var that = this;

	    this.getOptionsFor = function (propName) {
	        return (this.posts || []).map(function (p) {
	            return p[propName];
	        }).filter(function (p, idx, arr) {
	            return arr.indexOf(p) === idx;
	        });
	    };

	    this.filterByProperties = function (post) {   
	        // matching with AND
	        var matchesAND = true;
	        for (var prop in that.filter) {
	            if (noSubFilter(that.filter[prop])) continue;
	            if (!that.filter[prop][post[prop]]) {
	                matchesAND = false;
	                break;
	            }
	        }
	        return matchesAND;
	    
	    };

	    function noSubFilter(subFilterObj) {
	        for (var key in subFilterObj) {
	            if (subFilterObj[key]) return false;
	        }
	        return true;
	    }

	})

	.service('dataService', function($http, $q) {

	    var jobs;

	    var job; 
	    
	    this.getJobs = function(callback){
	        $http.get("/jobs").then(callback);
	    };

	    this.showJob = function(id, callback){
	        $http.get("/jobs/" + id).then(callback);
	    };


	    this.deleteJob = function(id) {
	        if (!id) {
	          return $q.resolve();
	        }
	        return $http.delete('/jobs/' + id).then(function() {  });
	    };

	    this.updateJob = function(job) {
	        
	        if (!job._id) {
	          return $q.resolve();
	        }
	        return $http.put('/jobs/' + job._id, job).then(function() {  });
	    };


	})

	.filter('capitalizeFirst', function () {
	    return function (str) {
	        str = str || '';
	        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
	    };
	})

	.filter('capitalizeEach', function () {
	    return function (str) {
	        str = str || '';
	        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	    };
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

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

/***/ }
]);