angular.module('controller.module').controller("rkGroupListController",['$scope', '$state', '$stateParams', '$controller', '$log', 'rkGroup', function($scope, $state, $stateParams, $controller, $log, rkGroup) {
	angular.extend(this, $controller('BaseController', {$scope: $scope}));
	var clubId = $stateParams.clubId;
	$scope.club = {};
	$scope.groups = [];
	$scope.initialized = false;
	$scope.errorMessage = "";
	$scope.error = false;
	
	rkGroup.findAllGroupsForClub(clubId).then(function(club){
		$scope.club = club;
		$scope.groups = club.groups;
		$log.debug($scope.groups.length);
		$scope.error = false;
		$scope.initialized = true;
	}, function(errMsg) {
		$scope.errorMessage = errMsg;
		$scope.error = true;
		$scope.initialized = true;
	});
	
	$scope.create = function() {
		$state.go('group-create');
	};

}]);