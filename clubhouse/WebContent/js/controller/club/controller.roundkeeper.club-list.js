angular.module('controller.module').controller("rkClubListController",['$scope', '$state', '$controller', '$log', 'rkClub', function($scope, $state, $controller, $log, rkClub) {
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
	
	$scope.create = function() {
		$state.go('club-create');
	};

}]);