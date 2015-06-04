angular.module('factory.module').factory('rkGroup', function( $q, $log, $firebaseArray, $firebaseObject, BaseFactory ) {
	var factory = angular.extend(BaseFactory, {});
	
	factory.findAllGroupsForClub = function(clubId) {
		var deferred = $q.defer();
		var groups = [];
		var club = {};
		$firebaseObject(factory.clubRef.child(clubId)).$loaded().then(function(clubModel) {
			club = clubModel;
			return $q.all(club.groups.map(function(groupId) {
		        return $firebaseObject(factory.groupRef.child(groupId)).$loaded();
		    }));
		}, function(err){
			deferred.reject("ERROR: Failed on club.findById[club]");
		}).then(function(groupModelArray){
			if(groupModelArray) {
				groups = groupModelArray;
			}
			var clubDto = factory.clubConverter.convertClub(club);
			clubDto.groups = factory.groupConverter.convertGroups(groups);
			deferred.resolve(clubDto);
		}, function(err){
			deferred.reject("ERROR: Failed on group.findAllGroupsForClub[club]");
		});
		
		return deferred.promise;
	};
	
	
	return factory;
});