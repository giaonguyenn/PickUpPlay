angular.module("PickUpPlayApp").controller("mapViewCtrl", function($scope, mainSrvc, $state) {

		$scope.getMapByZip = function(zipCode) {
			if(zipCode) {
				mainSrvc.getMapByZip(zipCode);
				$state.go("mapView");
			} else {
				$("#zipCode").css("border", "1px solid red");
			}
		};
});