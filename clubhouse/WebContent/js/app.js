var app = angular.module('hb.roundkeeper', ['ngRoute', 'ngCookies', 'firebase', 'controller.module', 'factory.module']);

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		reloadOnSearch: true,
		templateUrl : 'view/roundkeeper/home.html',
		controller: "RoundKeeperController"
	}).when('/clubs', {
		reloadOnSearch: true,
		templateUrl : 'view/roundkeeper/club/club-list.html',
		controller: "rkClubListController"
	}).when('/clubs/club/:id', {
		reloadOnSearch: true,
		templateUrl : 'view/roundkeeper/club/club-detail.html',
		controller: "rkClubDetailController"
	}).when('/members/member/:userId/club/:clubId', {
		reloadOnSearch: true,
		templateUrl : 'view/roundkeeper/member/member-detail.html',
		controller: "rkMemberDetailController"
	}).when('/users/user/:userId', {
		reloadOnSearch: true,
		templateUrl : 'view/roundkeeper/user/user-detail.html',
		controller: "rkUserDetailController"
	}).when('/courses/course/:courseId', {
		reloadOnSearch: true,
		templateUrl : 'view/roundkeeper/course/course-detail.html',
		controller: "rkCourseDetailController"
	}).otherwise({redirectTo: '/'});
});