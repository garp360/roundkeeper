angular.module('factory.module').factory('rkUser', function( $q, $log, $firebaseArray, $firebaseObject, BaseFactory ) {
	var factory = angular.extend(BaseFactory, {});
	
	factory.findUserById = function(userId) {
		var deferred = $q.defer();
		var user = {};
		
		$firebaseObject(factory.userRef.child(userId)).$loaded().then(function(userModel) {
			user = userModel;
			return user.clubs = user.clubs ? user.clubs : [];
		}, function(err) {
			deferred.reject("The member service failed at findById(" + userId + "). ERROR:1" + err);
		}).then(function(clubIdArray){
			return $q.all(clubIdArray.map(function(clubId) {
		        return $firebaseObject(factory.clubRef.child(clubId)).$loaded();
		    })); 
		}, function(err) {
			deferred.reject("The member service failed at findById(" + userId + "). ERROR:2" + err);
		}).then(function(clubModelArray) {
			user.clubs = factory.clubConverter.convertClubs(clubModelArray);
			deferred.resolve(user);	
		}, function(err) {
			deferred.reject("The member service failed at findById(" + userId + "). ERROR:3" + err);
		});
		return deferred.promise;
	};
	
	return factory;
});