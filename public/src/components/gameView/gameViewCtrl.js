angular.module("PickUpPlayApp").controller("gameViewCtrl", function($scope, mainSrvc, $state) {

	$scope.user = mainSrvc.user;

	console.log(mainSrvc);

	$scope.createGame = function (uid, game, numberOfPlayers, time) {
  		mainSrvc.createGame(uid, game, numberOfPlayers, time);
  	};

});