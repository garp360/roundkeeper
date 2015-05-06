angular.module('factory.module').factory('rkCourseConverter', function($q, $log) {
	var converter = {};
	converter.type = "COURSE";

	converter.convertCourse = function(model) {
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
	
	converter.convertCourses = function(modelArray) {
		var dtoArray = [];
		
		angular.forEach(modelArray, function(model) {
			dtoArray.push(converter.convertCourse(model));
		});

		return dtoArray;
	};

	return converter;
});