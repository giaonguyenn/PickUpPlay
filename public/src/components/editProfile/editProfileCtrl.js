angular.module("PickUpPlayApp").controller("editProfileCtrl", function($scope, mainSrvc, $state) {

	angular.element(document).ready(function(){
    	$("navbar").css("display", "initial");

    	$('a#click-a').click(function(){
      		$('.nav').toggleClass('nav-view');
   		 });
  	});
	
	$scope.user = mainSrvc.user;

	$scope.submitImage = (image, uid) => {
		mainSrvc.submitImage(image, uid)
			.then(function (results) {
				$scope.user.image = results;
  		});
	};

	$scope.gamesCreated = mainSrvc.gamesCreated;

});