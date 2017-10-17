angular.module("PickUpPlayApp").controller("editProfileCtrl", function($scope, mainSrvc, $state) {
	
	$scope.user = mainSrvc.user;

});