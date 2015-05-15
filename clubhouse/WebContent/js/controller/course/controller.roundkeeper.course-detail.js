angular.module('controller.module').controller("rkCourseDetailController",['$scope', '$controller', '$http', '$stateParams', '$location', '$log', '$cookieStore', 'rkCourse', function($scope, $controller, $http, $stateParams, $location, $log, $cookieStore, rkCourse) {
	angular.extend(this, $controller('BaseController', {$scope: $scope}));
	var courseId = $stateParams.courseId;
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
	
	$scope.getFrontNine = function(arr) {
		return arr.slice(0,9);
	};
	
	$scope.getBackNine = function(arr) {
		return arr.slice(9,18);
	};
	
	$scope.getSlopeRatingDefinition = function(teebox) {
		var slopeRating = "Slope/Rating not established";
		
		if((teebox.slope && teebox.rating) && (teebox.slope.male || teebox.slope.female)) {
			if(teebox.slope.male === teebox.slope.female && teebox.rating.male === teebox.rating.female) {
				slopeRating = "(" + teebox.slope.male + "/" + teebox.rating.male + ")";
			} else {
				slopeRating = "M(" + teebox.slope.male + "/" + teebox.rating.male + ") L(" + teebox.slope.female + "/" + teebox.rating.female + ")";
			}
		}
		
		return slopeRating;
	};
	
}]);