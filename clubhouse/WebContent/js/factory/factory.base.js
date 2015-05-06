angular.module('factory.module').factory('BaseFactory', function($q, $log, rkClubConverter, rkMemberConverter, rkGroupConverter, rkCourseConverter) {
	var factory = {};
	factory.clubRef = new Firebase("https://roundkeeper.firebaseio.com/clubs");
	factory.userRef = new Firebase("https://roundkeeper.firebaseio.com/users");
	factory.groupRef = new Firebase("https://roundkeeper.firebaseio.com/groups");
	factory.courseRef = new Firebase("https://roundkeeper.firebaseio.com/courses");
	factory.clubConverter = rkClubConverter;
	factory.memberConverter = rkMemberConverter;
	factory.groupConverter = rkGroupConverter;
	factory.courseConverter = rkCourseConverter;
	
	
	factory.formatter = {
		formatHandicap : function(hcp) {
			return hcp > 90 ? "NH" : hcp;
		}
	};


	return factory;
});