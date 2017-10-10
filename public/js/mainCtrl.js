angular.module("PickUpPlayApp").controller("mainCtrl", function($scope, mainSrvc, $state) {
	$scope.searchAddress = mainSrvc.searchAddress;
});