angular.module("PickUpPlayApp").controller("mapViewCtrl", function($scope, mainSrvc, $state) {

	const {zip,searchTerm} = $state.params;

	if(zip, searchTerm) {
		mainSrvc.getMapByAddress(zip, searchTerm);
	};
	
});