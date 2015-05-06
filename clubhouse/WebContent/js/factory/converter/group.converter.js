angular.module('factory.module').factory('rkGroupConverter', function($q, $log) {
	var converter = {};
	converter.type = "GROUP";

	converter.convertGroup = function(model) {
		var dto = {};
		
		if(model) {
			
			for ( var property in model) {
				if (model.hasOwnProperty(property)) {
					dto[property] = model[property];
				}
			}
		}
		
		return dto;
	};
	
	converter.convertGroups = function(modelArray) {
		var dtoArray = [];
		
		angular.forEach(modelArray, function(model) {
			dtoArray.push(converter.convertGroup(model));
		});

		return dtoArray;
	};

	return converter;
});