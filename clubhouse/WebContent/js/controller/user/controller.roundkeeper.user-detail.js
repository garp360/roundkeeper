angular.module('controller.module').controller("rkUserDetailController",['$scope', '$controller', '$http', '$stateParams', '$location', '$log', '$cookieStore', 'rkUser', function($scope, $controller, $http, $stateParams, $location, $log, $cookieStore, rkUser) {
	angular.extend(this, $controller('BaseController', {$scope: $scope}));
	var userId = $stateParams.userId;
	$scope.user = {};
	$scope.initialized = false;
	$scope.errorMessage = "";
	$scope.error = false;
	
	rkUser.findUserById(userId).then(function(user) {
		$scope.user = user;
		$scope.error = false;
		$scope.initialized = true;
	}, function (errMsg) {
		$scope.member = {};
		$scope.errorMessage = errMsg;
		$scope.error = true;
		$scope.initialized = true;
	});
}]);