angular.module("PickUpPlayApp").service("mainSrvc", function($http) {

	var apiKey = "AIzaSyDx3NmAEho6hkw_NSTWBZU3EFadH87jxRs";
	
	this.searchZip = function() {
		$(".searchbyZip").css("display", "initial");
	};
	
});