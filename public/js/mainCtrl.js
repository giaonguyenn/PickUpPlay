angular.module("PickUpPlayApp").controller("mainCtrl", function($scope, mainSrvc, $state) {
	$scope.searchZip = mainSrvc.searchZip;
});