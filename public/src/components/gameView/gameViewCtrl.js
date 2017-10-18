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
  			console.log(response);
  			$scope.useruid = $scope.currentgames.map(game => {
          return game.uid
        });
  			
        console.log("getCurrentGames useruid:", $scope.useruid)

  			mainSrvc.getUsername($scope.useruid)
  				.then((response) => {
  					console.log("gameView response:",response);
  					$scope.username = response[0].username;
  					console.log("$scope.username",$scope.username);
  					return $scope.username;
  			});
  		});
  	};

  	$scope.getMyGames = (useruid) => {
		mainSrvc.getMyGames(useruid)
			.then((response) => {
				$state.go("myGames", response);
		});
	};

});