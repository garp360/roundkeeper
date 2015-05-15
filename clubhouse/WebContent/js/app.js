var app = angular.module('hb.roundkeeper', ['ui.router', 'ui.bootstrap', 'ngCookies', 'firebase', 'controller.module', 'factory.module']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
 
    $stateProvider
        .state('home', {
        	reloadOnSearch: true,
            url:'/',
            views: {
            	'content': {
            		templateUrl: 'view/roundkeeper/home.html',
            		controller: 'RoundKeeperController'
            	}
            }
        })
        .state('club-list', {
            url:'/clubs',
            views: {
            	'content': {
            		templateUrl: 'view/roundkeeper/club/club-list.html',
            		controller: 'rkClubListController'
            	}
            }
        })
        .state('club-detail', {
            url:'/clubs/club/:id',
            views: {
            	'content': {
            		templateUrl: 'view/roundkeeper/club/club-detail.html',
            		controller: 'rkClubDetailController'
            	}
            }
        })
        .state('member-detail', {
            url:'/members/member/:userId/club/:clubId',
            views: {
            	'content': {
            		templateUrl: 'view/roundkeeper/member/member-detail.html',
            		controller: 'rkMemberDetailController'
            	}
            }
        })
        .state('user-detail', {
            url:'/users/user/:userId',
            views: {
            	'content': {
            		templateUrl: 'view/roundkeeper/user/user-detail.html',
            		controller: 'rkUserDetailController'
            	}
            }
        })
        .state('course-detail', {
            url:'/courses/course/:courseId',
            views: {
            	'content': {
            		templateUrl: 'view/roundkeeper/course/course-detail.html',
            		controller: 'rkCourseDetailController'
            	}
            }
        })
        .state('tee-detail', {
            url:'/courses/course/:courseId/teebox/:teeboxId',
            views: {
            	'content': {
            		templateUrl: 'view/roundkeeper/course/teebox-detail.html',
            		controller: 'rkTeeboxDetailController'
            	}
            }
        });
}]);