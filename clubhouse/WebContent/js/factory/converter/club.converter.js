angular.module('factory.module').factory('rkClubConverter', function($q, $log) {
	var converter = {};
	converter.type = "CLUB";

	converter.convertClub = function(clubModel, memberModelArray, userModelArray) {
		var club = {};
		
		if(clubModel) {
			
			for ( var property in clubModel) {
				if (clubModel.hasOwnProperty(property)) {
					club[property] = clubModel[property];
				}
			}
			
			if(memberModelArray && userModelArray && memberModelArray.length == userModelArray.length) {
				club.members = converter.convertClubMembers(memberModelArray, userModelArray);
			}

		}
		
		return club;
	};
	
	converter.convertClubs = function(modelArray) {
		var dtoArray = [];
		
		angular.forEach(modelArray, function(model) {
			dtoArray.push(converter.convertClub(model));
		});

		return dtoArray;
	};
	
	
	
	converter.convertClubMembers = function(memberModelArray, userModelArray) {
		var clubMembers = [];
		if(memberModelArray && userModelArray && memberModelArray.length == userModelArray.length) {
			for(var i=0; i<memberModelArray.length; i++) {
				for(var j=0; j<memberModelArray.length; j++) {
					if(memberModelArray[i].id === userModelArray[i].id) {
						clubMembers.push(converter.convertClubMember(memberModelArray[i], userModelArray[i]));
						break;
					}
				}
			}
		}
		
		return clubMembers;
	};
	
	converter.convertClubMember = function(memberModel, userModel) {
		var clubMember = {};
		if(memberModel.id === userModel.id) {
			
			for ( var property in userModel) {
				if (userModel.hasOwnProperty(property)) {
					clubMember[property] = userModel[property];
				}
			}
			
			for ( var property in memberModel) {
				if (memberModel.hasOwnProperty(property)) {
					clubMember[property] = memberModel[property];
				}
			}
		}
		
		return clubMember;
	};

	return converter;
});