angular.module("PickUpPlayApp").controller("searchByCtrl", function($scope, mainSrvc, $state) {

  $scope.searchAddress = mainSrvc.searchAddress;

});