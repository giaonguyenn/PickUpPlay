angular.module("PickUpPlayApp").controller("myGamesCtrl", function($scope, mainSrvc, $state, $stateParams) {

	$scope.myGames = mainSrvc.myGames;

});