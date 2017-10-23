angular.module("PickUpPlayApp").controller("editProfileCtrl", function($scope, mainSrvc, $state) {

	angular.element(document).ready(function(){
    	$("navbar").css("display", "initial");

    	$('a#click-a').click(function(){
      		$('.nav').toggleClass('nav-view');
   		 });
  	});
	
	$scope.user = mainSrvc.user;

	// $scope.uid = mainSrvc.user.uid;
	// this.uid = $scope.uid;

	// console.log(uid);

	// console.log($scope.uid);

	$scope.submitImage = (image, uid) => {
		mainSrvc.submitImage(image, uid)
			.then(function (results) {
				$scope.user.image = results;
  		});
	};

	// $scope.numberOfGamesCreated = (uid) => {
	// 	console.log(uid);
	// 	mainSrvc.getNumberOfGamesCreated(uid)
	// 		.then((response) => {
	// 			console.log(response);
	// 		});
	// };

	// $scope.numberOfGamesCreated();

});