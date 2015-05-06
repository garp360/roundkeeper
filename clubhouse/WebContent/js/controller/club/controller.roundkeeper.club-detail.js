angular.module('controller.module').controller("rkClubDetailController",['$scope', '$controller', '$http', '$routeParams', '$location', '$log', '$cookieStore', 'rkClub', function($scope, $controller, $http, $routeParams, $location, $log, $cookieStore, rkClub) {
	angular.extend(this, $controller('BaseController', {$scope: $scope}));
	var clubId = $routeParams.id;
	$scope.club = {};
	$scope.initialized = false;
	$scope.errorMessage = "";
	$scope.error = false;
	
	rkClub.findClubById(clubId).then(function(club) {
		$scope.club = club;
		$scope.error = false;
		$scope.initialized = true;
	}, function (errMsg) {
		$scope.club = {};
		$scope.errorMessage = errMsg;
		$scope.error = true;
		$scope.initialized = true;
	});
}]);