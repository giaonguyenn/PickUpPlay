angular.module("PickUpPlayApp").controller("gameViewCtrl", function($scope, mainSrvc, $state, $stateParams) {

	$scope.user = mainSrvc.user;

	$scope.place = mainSrvc.places.find( place => place.id === $stateParams.id);

	$scope.createGame = function (uid, game, numberOfPlayers, time, courtid) {
  		mainSrvc.createGame(uid, game, numberOfPlayers, time, courtid)
  			.then((response) => {
  				getCurrentGames();
  			});
  	};

  	getCurrentGames();

  	function getCurrentGames() {
  		mainSrvc.getCurrentGames($stateParams.id)
  		.then((response) => {
  			$scope.currentgames = response;
  			// $scope.userById = () => {
  			// 	mainSrvc.getUsername($scope.currentgames.uid)
  			// 	.then( user => {
  			// 		$scope.username = user.username
  			// 	})
  			// }
  		});
  	};

  	$scope.getMyGames = (useruid) => {
		mainSrvc.getMyGames(useruid)
			.then((response) => {
				$state.go("myGames", response);
			})
	};

});