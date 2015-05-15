angular.module('controller.module').controller("rkTeeboxDetailController",['$scope', '$controller', '$http', '$stateParams', '$location', '$log', '$cookieStore', 'rkCourse', function($scope, $controller, $http, $stateParams, $location, $log, $cookieStore, rkCourse) {
	angular.extend(this, $controller('BaseController', {$scope: $scope}));
	var courseId = $stateParams.courseId;
	var teeboxId = $stateParams.teeboxId;
	$scope.course = {};
	$scope.teebox = {};
	$scope.initialized = false;
	$scope.errorMessage = "";
	$scope.error = false;
	
	rkCourse.findCourseById(courseId).then(function(course) {
		$scope.course = course;
		angular.forEach(course.tees, function(tee) {
			if(tee.id === teeboxId) {
				$scope.teebox = tee; 
			}
		});
		$scope.error = false;
		$scope.initialized = true;
	}, function (errMsg) {
		$scope.course = {};
		$scope.errorMessage = errMsg;
		$scope.error = true;
		$scope.initialized = true;
	});
	
}]);