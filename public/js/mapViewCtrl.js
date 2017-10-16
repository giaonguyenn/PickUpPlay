angular.module("PickUpPlayApp").controller("mapViewCtrl", function($scope, mainSrvc, $state) {
	if($state.params.zip) {
		mainSrvc.getMapByAddress($state.params.zip);
	};
});