angular.module("PickUpPlayApp").controller("mainCtrl", function($scope, mainSrvc, $state) {

  $scope.signIn = function (emailSignIn,passwordSignIn) {
  	mainSrvc.signIn(emailSignIn,passwordSignIn);
  	$state.go("searchBy");
  };





  $scope.searchAddress = mainSrvc.searchAddress;

  $scope.signOut = mainSrvc.signOut;

  $scope.createGame = function (game, numberOfPlayers, time) {
  	mainSrvc.createGame(game, numberOfPlayers, time);
  };

});