angular.module("PickUpPlayApp").service("mainSrvc", function($http) {
	
	this.searchZip = function() {
		$(".searchbyZip").css("display", "initial");
	};
	
});