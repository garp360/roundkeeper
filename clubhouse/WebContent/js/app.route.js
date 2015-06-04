angular.module('hb.roundkeeper')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
 
    $stateProvider
        .state('home', {
        	reloadOnSearch: true,
            url:'/',
    		templateUrl: 'view/roundkeeper/home.html',
    		controller: 'RoundKeeperController'
        })
        .state('club-list', {
            url:'/clubs',
    		templateUrl: 'view/roundkeeper/club/club-list.html',
    		controller: 'rkClubListController'
        })
        .state('club-detail', {
            url:'/clubs/{clubId}',
    		templateUrl: 'view/roundkeeper/club/club-detail.html',
    		controller: 'rkClubDetailController' 
        })
        .state('club-edit', {
            url:'/clubs/edit/{clubId}',
    		templateUrl: 'view/roundkeeper/club/club-edit.html',
    		controller: 'rkClubEditController',
    		data: {
    			isEdit: true
    		}
        })
        .state('club-create', {
            url:'/clubs/edit',
    		templateUrl: 'view/roundkeeper/club/club-edit.html',
    		controller: 'rkClubEditController',
    		data: {
    			isEdit: false
    		}
        })
        .state('member-detail', {
            url:'/clubs/{clubId}/members/{memberId}',
    		templateUrl: 'view/roundkeeper/member/member-detail.html',
    		controller: 'rkMemberDetailController'
        })
        .state('group-list', {
            url:'/clubs/{clubId}/groups',
    		templateUrl: 'view/roundkeeper/group/group-list.html',
    		controller: 'rkGroupListController'
        })
        .state('group-detail', {
        	url:'/clubs/{clubId}/group/{groupId}',
        	templateUrl: 'view/roundkeeper/group/group-detail.html',
        	controller: 'rkGroupDetailController'
        })
        .state('user-detail', {
            url:'/users/{userId}',
    		templateUrl: 'view/roundkeeper/user/user-detail.html',
    		controller: 'rkUserDetailController'
        })
        .state('course-detail', {
            url:'/courses/{courseId}',
    		templateUrl: 'view/roundkeeper/course/course-detail.html',
    		controller: 'rkCourseDetailController'
        })
        .state('teebox-detail', {
            url:'/courses/{courseId}/teebox/{teeboxId}',
    		templateUrl: 'view/roundkeeper/course/teebox-detail.html',
    		controller: 'rkTeeboxDetailController'
        });
}]);