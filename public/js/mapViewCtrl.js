angular.module("PickUpPlayApp").controller("mapViewCtrl", function($scope, mainSrvc, $state) {

		$scope.getMapByAddress = function(address) {
			if(address) {
				mainSrvc.getMapByAddress(address);
				$state.go("mapView");
			} else {
				$("#address").css("border", "1px solid red");
			}
		};
});