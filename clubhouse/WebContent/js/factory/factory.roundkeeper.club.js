angular.module('factory.module').factory('rkClub', function( $q, $log, $firebaseArray, $firebaseObject, BaseFactory ) {
	var factory = angular.extend(BaseFactory, {});
	
	
	factory.findAllClubs = function() {
		var deferred = $q.defer();

		$firebaseArray(factory.clubRef).$loaded().then(function(clubModelArray){
			return clubModelArray;
		}, function(err){
			deferred.reject("ERROR: Failed on club.findAll");
		}).then(function(clubModelArray){
			var clubs = [];
			angular.forEach(clubModelArray, function(clubModel) {
				clubs.push(factory.clubConverter.convertClub(clubModel));
			});
			deferred.resolve(clubs);
		}, function(err){
			deferred.reject("ERROR: Failed on clubConverter.convertClub");
		});

		return deferred.promise;
	};

	factory.findClubById = function(id) {
		var deferred = $q.defer();
		var club = {};
		var members = [];
		var users = [];
		var groups = [];
		$firebaseObject(factory.clubRef.child(id)).$loaded().then(function(clubModel) {
			club = clubModel;
			return club.id;
		}, function(err){
			deferred.reject("ERROR: Failed on club.findById[club]");
		}).then(function(clubId){
			return $firebaseArray(factory.clubRef.child(clubId).child("members")).$loaded();
		}, function(err){
			deferred.reject("ERROR: Failed on club.findById[members]");
		}).then(function(clubMemberModelArray) {
			members = clubMemberModelArray;
			return $q.all(clubMemberModelArray.map(function(member) {
		        return $firebaseObject(factory.userRef.child(member.id)).$loaded();
		    }));
		}, function(err){
			deferred.reject("ERROR: Failed on club.findById[users]");
		}).then(function(userModelArray){
			users = userModelArray;
			return $q.all(club.groups.map(function(groupId) {
		        return $firebaseObject(factory.groupRef.child(groupId)).$loaded();
		    }));
		}, function(err){
			deferred.reject("ERROR: Failed on club.findById[groups]");
		}).then(function(groupModelArray){
			groups = groupModelArray;
			return $q.all(club.courses.map(function(courseId) {
		        return $firebaseObject(factory.courseRef.child(courseId)).$loaded();
		    }));
		}, function(err){
			deferred.reject("ERROR: Failed on club.findById[courses]");
		}).then(function(courseModelArray){
			courses = courseModelArray;
			var clubDto = factory.clubConverter.convertClub(club);
			clubDto.members = factory.memberConverter.convertMembers(members, users);
			clubDto.groups = factory.groupConverter.convertGroups(groups);
			clubDto.courses = factory.courseConverter.convertCourses(courses);
			deferred.resolve(clubDto);
		}, function(err){
			deferred.reject("ERROR: Failed on club.findById[dto]");
		});
		
		return deferred.promise;
	};
	
	
	
	
	
//	return $q.all(club.groups.map(function(groupId) {
//        return $firebaseObject(factory.groupRef.child(groupId)).$loaded();
//    }));
//}, function(err){
//	deferred.reject("ERROR: Failed on clubConverter.convertClub");
//}).then(function(groupModelArray){
//	club = factory.clubConverter.convertClub(clubModel);
//	return $firebaseArray(factory.clubRef.child(clubModel.id).child("members")).$loaded();
//}, function(err){
//	deferred.reject("ERROR: Failed on club.findById[members]");
//}).then(function(clubMemberModelArray) {
//	members = clubMemberModelArray;
//	return $q.all(clubMemberModelArray.map(function(member) {
//        return $firebaseObject(factory.userRef.child(member.id)).$loaded();
//    }));
	
	function _fetchAllMembers(memberObjectArray) {
		return $q.all(memberObjectArray.map(function(member) {
	        return $firebaseObject(userRef.child(member.id)).$loaded();
	    })); 
	}
	
	function _fetchAllGroups(groupIdArray) {
		return $q.all(groupIdArray.map(function(groupId) {
	        return $firebaseObject(groupRef.child(groupId)).$loaded();
	    })); 
	}
	
	return factory;
});