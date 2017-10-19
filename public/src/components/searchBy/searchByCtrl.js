angular.module("PickUpPlayApp").controller("searchByCtrl", function($scope, mainSrvc, $state) {

  	$scope.showSportsView = (address) => {
  		if(!address) {
  			alert ("Please enter Address, City or Zip Code.")
  		} else {
	  		if(Number(address)) {
	  			if (address.length == 5) {
	  				mainSrvc.showSportsView();
	  			} else {
	  				alert ("Please enter a valid zip code.");
	  			}
	  		} else {
	  			mainSrvc.showSportsView();
	  		}	
  		}
  	};

	mainSrvc.getSports()
		.then((response) => {
		$scope.sports = response;
	});

});