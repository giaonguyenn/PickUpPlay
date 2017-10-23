angular.module("PickUpPlayApp").controller("mapViewCtrl", function($scope, mainSrvc, $state) {

	angular.element(document).ready(function(){
    	$("navbar").css("display", "initial");

    	$('a#click-a').click(function(){
      		$('.nav').toggleClass('nav-view');
   		 });
  	});

	const {zip,searchTerm} = $state.params;

	if(zip, searchTerm) {
		mainSrvc.getMapByAddress(zip, searchTerm);
	};
	
});