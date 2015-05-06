angular.module('controller.module').controller("RoundKeeperController",['$scope', '$controller', '$http', '$routeParams', '$location', '$log', '$cookieStore', 'RoundKeeper', function($scope, $controller, $http, $routeParams, $location, $log, $cookieStore, RoundKeeper) {
	angular.extend(this, $controller('BaseController', {$scope: $scope}));
	$scope.event = {};
	$scope.controllerName = "HomeController";
	$scope.criteria = $cookieStore.get('homeUserCriteria');
	$scope.use35Rule = true;
	$scope.use35RuleTeebox = {
			name: "blue",
			slope: 69.6,
			rating: 125
		};
	$scope.intitalized = false;
	$scope.errMessage = null;
	var eventId = 2; //$routeParams.eventId
	
	
	RoundKeeper.loadEvent(eventId).then(function(event) {
		$scope.event = event;
		$scope.intitalized = true;
		$scope.errMessage = null;
	},function(err) {
		$scope.errMessage = err;
		$scope.intitalized = true;
	});
	
	$scope.calculateCourseHcp = function(g) {
		return Math.round((g.hcpIndex * g.teebox.rating / 113));
	};
	
	$scope.calculate35Hcp = function(g) {
		var courseHcp35RuleAdjustment = 0;
		if($scope.use35RuleTeebox) {
			courseHcp35RuleAdjustment = Math.round($scope.use35RuleTeebox.slope - g.teebox.slope) * -1;
			$log.debug(g.name + " courseHcp35RuleAdjustment = " + courseHcp35RuleAdjustment);
		}
		return Math.round((g.hcpIndex * g.teebox.rating / 113)) + courseHcp35RuleAdjustment;
	};
	
}]);