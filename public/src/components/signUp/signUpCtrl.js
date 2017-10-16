angular.module("PickUpPlayApp").controller("signUpCtrl", function($scope, mainSrvc, $state) {

	$scope.createUser = function (firstName, email, lastName, username, password) {
    	mainSrvc.createUser(firstName, email, lastName, username, password).then( () => {
    		$state.go("editProfile");	
    	});  	
  	};

});