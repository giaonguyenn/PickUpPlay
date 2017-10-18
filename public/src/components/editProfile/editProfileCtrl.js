angular.module("PickUpPlayApp").controller("editProfileCtrl", function($scope, mainSrvc, $state) {
	
	$scope.user = mainSrvc.user;

	$scope.submitImage = (image, uid) => {
		console.log($scope.user.image);
		mainSrvc.submitImage(image, uid)
			.then(function (results) {
				$scope.user.image = results;
				console.log(results);
  		})
			;
	};

});