angular.module("PickUpPlayApp").controller("gameViewCtrl", function($scope, mainSrvc, $state, $stateParams) {

	$scope.user = mainSrvc.user;

	$scope.place = mainSrvc.places.find( place => place.id === $stateParams.id);

	$scope.createGame = function (uid, game, numberOfPlayers, time, courtid) {
  		mainSrvc.createGame(uid, game, numberOfPlayers, time, courtid);
  	};

  	mainSrvc.getCurrentGames()
  		.then((response) => {
  			$scope.currentgames = response;
  		});

});