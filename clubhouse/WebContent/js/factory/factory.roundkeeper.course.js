angular.module('factory.module').factory('rkCourse', function( $q, $log, $firebaseArray, $firebaseObject, BaseFactory ) {
	var factory = angular.extend(BaseFactory, {});
	
	factory.findAllCourses = function() {
		var deferred = $q.defer();

		$firebaseArray(factory.courseRef).$loaded().then(function(courseModelArray){
			return courseModelArray;
		}, function(err){
			deferred.reject("ERROR: Failed on course.findAll");
		}).then(function(courseModelArray){
			var courses = [];
			angular.forEach(courseModelArray, function(courseModel) {
				courses.push(factory.courseConverter.convertCourse(courseModel));
			});
			deferred.resolve(courses);
		}, function(err){
			deferred.reject("ERROR: Failed on courseConverter.convertCourse");
		});

		return deferred.promise;
	};

	factory.findCourseById = function(courseId) {
		var deferred = $q.defer();
		
		$firebaseObject(factory.courseRef.child(courseId)).$loaded().then(function(courseModel) {
			deferred.resolve(factory.courseConverter.convertCourse(courseModel));
		}, function(err){
			deferred.reject("ERROR: Failed on course.findById[courseId]");
		});
		
		return deferred.promise;
	};
	
	
	return factory;
});