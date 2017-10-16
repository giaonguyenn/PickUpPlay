angular.module("PickUpPlayApp").controller("sportsViewCtrl", function($scope, mainSrvc, $state) {

	mainSrvc.getSports()
		.then((response) => {
			$scope.sports = response;
	});

});