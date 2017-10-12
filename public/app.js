angular.module("PickUpPlayApp", ["ui.router"])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state("login", {
				url:"/",
				templateUrl: "src/components/login/login.html",
				controller: "mainCtrl"
			})
			.state("signUp", {
				url:"/signUp",
				templateUrl: "src/components/signUp/signUp.html"
			})
			.state("editProfile", {
				url:"/editProfile",
				templateUrl: "src/components/editProfile/editProfile.html"
			})
			.state("searchBy", {
				url:"/searchBy",
				templateUrl: "src/components/searchBy/searchBy.html",
				controller: "mapViewCtrl"
			})
			.state("mapView", {
				url:"/mapView",
				templateUrl: "src/components/mapView/mapView.html",
				controller: "mapViewCtrl"
			})
			.state("sportsView", {
				url:"/sportsView",
				templateUrl: "src/components/sportsView/sportsView.html"
			})
	});