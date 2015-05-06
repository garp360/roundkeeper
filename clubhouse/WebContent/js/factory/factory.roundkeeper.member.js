angular.module('factory.module').factory('rkMember', function( $q, $log, $firebaseArray, $firebaseObject, BaseFactory ) {
	var factory = angular.extend(BaseFactory, {});
	
	factory.findMemberById = function(userId, clubId) {
		var deferred = $q.defer();
		$firebaseObject(factory.userRef.child(userId)).$loaded().then(function(user) {
			if(user.clubs.indexOf(clubId) >= 0) {
				$firebaseObject(factory.clubRef.child(clubId)).$loaded().then(function(club) {
					$firebaseObject(factory.clubRef.child(clubId).child("members").child(userId)).$loaded().then(function(memberData) {
						deferred.resolve(_convertToClubMemberDto(club, memberData, user));
					});
				});
			}
		}, function(err) {
			deferred.reject("The member service failed at findById(" + userId + "). ERROR:" + err);
		});
		return deferred.promise;
	};

	function _convertToClubMemberDto(club, clubMember, user) {
		var dto = {
			user: user,
			club: club,
			joined: clubMember.joined,
			status: clubMember.status
		};
		return dto;
	}
	
	function _convertToClubMemberDto(club, clubMember, user) {
		var dto = {};
		dto.id = user.id;
		dto.name = user.lastName + ", " + user.firstName;
		dto.status = clubMember.status;
		dto.joined = clubMember.joined;
		dto.club = {};
		
		for (var property in club) {
		    if (club.hasOwnProperty(property)) {
		    	dto.club[property] = club[property];
		    }
		}	
		return dto;
	}

	return factory;
});