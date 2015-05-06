angular.module('factory.module').factory('rkMemberConverter', function($q, $log) {
	var converter = {};
	converter.type = "MEMBER";

	converter.convertMembers = function(memberModelArray, userModelArray) {
		var clubMembers = [];
		if(memberModelArray && userModelArray && memberModelArray.length == userModelArray.length) {
			for(var i=0; i<memberModelArray.length; i++) {
				for(var j=0; j<memberModelArray.length; j++) {
					if(memberModelArray[i].id === userModelArray[i].id) {
						clubMembers.push(converter.convertMember(memberModelArray[i], userModelArray[i]));
						break;
					}
				}
			}
		}
		
		return clubMembers;
	};
	
	converter.convertMember = function(memberModel, userModel) {
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