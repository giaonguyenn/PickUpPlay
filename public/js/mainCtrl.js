angular.module("PickUpPlayApp").controller("mainCtrl", function($scope, mainSrvc, $state) {

	$scope.searchAddress = mainSrvc.searchAddress;
	$scope.createUser = function(firstName, email, lastName, username, password) {
		mainSrvc.createUser(firstName, email, lastName, username, password);
		$state.go("editProfile");
	};
  	$scope.signIn = function(emailSignIn,passwordSignIn) {
  		mainSrvc.signIn(emailSignIn,passwordSignIn);
  		$state.go("searchBy");
  	};
  	$scope.signOut = mainSrvc.signOut;
});