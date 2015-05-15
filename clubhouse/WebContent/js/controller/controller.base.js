angular.module('controller.module').controller("BaseController",['$scope', function($scope){
	
	this.formatNameLF = function(user) {
		return user.lastname + ", " + user.firstname;
	};
	
	this.formatNameFL = function(user) {
		return user.firstname + " " + user.lastname;
	};
	
	$scope.formatControllerName = function(ctrlName) {
		return ("controllers." + ctrlName + ".js");
	};
 	
	$scope.hcpFormat = function(hcp) {
		var h = parseFloat(hcp).toFixed(1);
		return h > 90 ? "NH" : h < 0 ? "+" + Math.abs(h) : h;
 	};

 	$scope.effectiveDateFormat = function(date) {
 		var effDate = moment(date);
 		return effDate.format("MMM Do, YYYY");
 	};

 	$scope.scoringDateFormat = function(date) {
 		var effDate = moment(date);
 		return effDate.format("MM/DD/YYYY");
 	};
 	
 	$scope.sum = function(arr) {
 		var total = 0;
 		angular.forEach(arr, function(value) {
 			total += value;
 		});
 		return total;
 	};
}]);