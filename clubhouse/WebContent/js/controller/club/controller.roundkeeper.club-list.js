angular.module('controller.module').controller("rkClubListController",['$scope', '$controller', '$http', '$stateParams', '$location', '$log', '$cookieStore', 'rkClub', function($scope, $controller, $http, $stateParams, $location, $log, $cookieStore, rkClub) {
	angular.extend(this, $controller('BaseController', {$scope: $scope}));
	$scope.clubs = [];
	$scope.initialized = false;
	$scope.errorMessage = "";
	$scope.error = false;
	
	rkClub.findAllClubs().then(function(clubs){
		$scope.clubs = clubs;
		$log.debug($scope.clubs.length);
		$scope.error = false;
		$scope.initialized = true;
	}, function(errMsg) {
		$scope.errorMessage = errMsg;
		$scope.error = true;
		$scope.initialized = true;
	});

}]);