angular.module('factory.module').factory('RoundKeeper', function( $q, $log ) {
	var factory = {};
	
	factory.loadEvent = function(eventId) {
		var deferred = $q.defer();
		var sampleEvent = _getSampleEvent();
		var e = _convert(sampleEvent);
		
		if(e) {
			deferred.resolve(e);
		} else {
			deferred.reject("failed event load for EVENT_ID: " + eventId);
		}
		
		return deferred.promise;
	};
	
	function _convert(event) {
		var scoringEvent = {
			date: 1429194944382,
			course: event.course,
			players : _getPlayers(event.players)
		};
		return scoringEvent;
	}
	
	function _getPlayers(players) {
		var p = [];
		angular.forEach(players, function(player) {
			var hasPointCap = player.pgaPoints ? (player.pgaPoints.length >= 3 ? false : true) : true;
			p.push({
				name : player.lastName + ", " + player.firstName,
				email : player.email,
				hasPointCap : hasPointCap,
				requiredPts : _calculateRequiredPoints(hasPointCap, player),
				hcpIndex : player.hcpIndex,
				teebox : player.teebox,
				round : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			});
		});
		return p;
	}
	
	function _calculateRequiredPoints(hasPointCap, player) {
		var requiredPoints = 0;
		if(hasPointCap) {
			requiredPoints = 36 - Math.round(player.hcpIndex * player.teebox.rating / 113);
		} else {
			var topThree = _getTopThreeOfLastFive(player.pgaPoints);
			requiredPoints = (topThree[0] + topThree[1] + topThree[2]) / 3;
		}
		return Math.round(requiredPoints);
	}
	
	function _getTopThreeOfLastFive(pgaPoints) {
		var sliceSize = pgaPoints.length >= 5 ? 5 : pgaPoints.length;
		var pgaPointsSample = pgaPoints.slice(0,sliceSize);
		
		pgaPointsSample.sort(function(a,b) {
			return b > a ? 1 : b < a ? -1 : 0;
		} );
		$log.debug("pgaPointsSample sorted descending = " + pgaPointsSample);
		
		var topThree = pgaPointsSample.slice(0,3);
		$log.debug("topThree = " + topThree);
		
		return topThree;
	}
	
	function _getSampleEvent() {
		var event = {
				date: 1429194944382,
				course: {
					name: "South Hampton Golf Club",
					scorecard : {
						par : [4,4,3,4,4,5,3,4,5,4,4,3,5,4,3,4,5,4],
						hcp : [8,6,16,18,2,12,10,4,14,11,9,15,13,3,7,17,1,5]
					},
					tees : [{
						name: "green",
						slope: 63.6,
						rating: 110
					}, {
						name: "white",
						slope: 66.6,
						rating: 116
					}, {
						name: "blue",
						slope: 69.6,
						rating: 125
					}, {
						name: "black",
						slope: 71.3,
						rating: 133
					}, {
						name: "gold",
						slope: 74.0,
						rating: 139
					}]
				},
				players: [
				   {
					  email : "garp360@aol.com",
					  firstName : "Garth",
					  lastName : "Pidcock",
					  pgaPoints : [27, 33, 27, 27, 33, 41, 40, 41],
					  teebox : {
							name: "black",
							slope: 71.3,
							rating: 133
						},
						hcpIndex : 4.8
				   },
				   {
					  email : "tom9980@aol.com",
					  firstName : "Tom",
					  lastName : "Jacobs",
					  pgaPoints : [21, 44],
					  teebox : {
							name: "blue",
							slope: 69.6,
							rating: 125
						},
						hcpIndex : 8.8
				   },
				   {
					  email : "al889@aol.com",
					  firstName : "Allen",
					  lastName : "Fontsz",
					  pgaPoints : [30, 30, 21],
					  teebox :{
							name: "gold",
							slope: 74.0,
							rating: 139
						},
						hcpIndex : 2.6
				   },
				   {
					  email : "john160@aol.com",
					  firstName : "John",
					  lastName : "Mazer",
					  pgaPoints : [7, 21, 20, 21],
					  teebox : {
							name: "white",
							slope: 66.6,
							rating: 116
						},
						hcpIndex : 15.3
				   }
				]
			};
		
			return event;
	}
	
	return factory;
});