'use strict';

var angular = require('angular');


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
