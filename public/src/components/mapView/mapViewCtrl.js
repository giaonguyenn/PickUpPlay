angular.module("PickUpPlayApp").controller("mapViewCtrl", function($scope, mainSrvc, $state) {

	angular.element(document).ready(function(){
	  $("navbar").css("display", "initial");
	});

	const {zip,searchTerm} = $state.params;

	if(zip, searchTerm) {
		mainSrvc.getMapByAddress(zip, searchTerm);
	};
	
});