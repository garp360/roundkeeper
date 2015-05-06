angular.module('controller.module').controller("rkCourseDetailController",['$scope', '$controller', '$http', '$routeParams', '$location', '$log', '$cookieStore', 'rkCourse', function($scope, $controller, $http, $routeParams, $location, $log, $cookieStore, rkCourse) {
	angular.extend(this, $controller('BaseController', {$scope: $scope}));
	var courseId = $routeParams.courseId;
	$scope.course = {};
	$scope.initialized = false;
	$scope.errorMessage = "";
	$scope.error = false;
	
	rkCourse.findCourseById(courseId).then(function(course) {
		$scope.course = course;
		$scope.error = false;
		$scope.initialized = true;
	}, function (errMsg) {
		$scope.course = {};
		$scope.errorMessage = errMsg;
		$scope.error = true;
		$scope.initialized = true;
	});
}]);