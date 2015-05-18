angular.module('controller.module').controller("rkClubEditController",['$scope', '$controller', '$state', '$stateParams', '$log', 'rkClub', function($scope, $controller, $state, $stateParams, $log, rkClub) {
	angular.extend(this, $controller('BaseController', {$scope: $scope}));
	var clubId = $stateParams.clubId;
	$scope.club = {};
	$scope.initialized = false;
	$scope.errorMessage = "";
	$scope.error = false;
	$scope.isEdit = $state.current.data.isEdit;
	
	if($scope.isEdit) {
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
	} else {
		$scope.error = false;
		$scope.initialized = true;
	}
}]);