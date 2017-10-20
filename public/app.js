angular.module("PickUpPlayApp", ["ui.router", "ngFileUpload"])
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
				templateUrl: "src/components/signUp/signUp.html",
				controller: "signUpCtrl"
			})
			.state("editProfile", {
				url:"/editProfile",
				templateUrl: "src/components/editProfile/editProfile.html",
				controller: "editProfileCtrl"
			})
			.state("searchBy", {
				url:"/searchBy",
				templateUrl: "src/components/searchBy/searchBy.html",
				controller: "searchByCtrl"
			})
			.state("mapView", {
				url:"/mapView/:zip/:searchTerm",
				templateUrl: "src/components/mapView/mapView.html",
				controller: "mapViewCtrl"
			})
			.state("sportsView", {
				url:"/sportsView",
				templateUrl: "src/components/sportsView/sportsView.html"
			})
			.state("gameView", {
				url:"/gameView/:id",
				templateUrl: "src/components/gameView/gameView.html",
				controller: "gameViewCtrl"
			})
			.state("myGames", {
				url:"/myGames",
				templateUrl: "src/components/myGames/myGames.html",
				controller: "myGamesCtrl"
			})
	});