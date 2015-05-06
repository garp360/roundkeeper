angular.module('controller.module').controller("rkMemberDetailController",['$scope', '$controller', '$http', '$routeParams', '$location', '$log', '$cookieStore', 'rkMember', function($scope, $controller, $http, $routeParams, $location, $log, $cookieStore, rkMember) {
	angular.extend(this, $controller('BaseController', {$scope: $scope}));
	var userId = $routeParams.userId;
	var clubId = $routeParams.clubId;
	$scope.member = {};
	$scope.initialized = false;
	$scope.errorMessage = "";
	$scope.error = false;
	
	rkMember.findMemberById(userId, clubId).then(function(member) {
		$scope.member = member;
		$scope.error = false;
		$scope.initialized = true;
	}, function (errMsg) {
		$scope.member = {};
		$scope.errorMessage = errMsg;
		$scope.error = true;
		$scope.initialized = true;
	});
}]);