angular.module("PickUpPlayApp").controller("signUpCtrl", function($scope, mainSrvc, $state) {

	$scope.createUser = function (firstname, email, lastname, username, password) {
    	mainSrvc.createUser(firstname, email, lastname, username, password)
    		.then( (response) => {
    			$state.go("editProfile");	
    		})
    		.catch((err) => {
    			alert(err);
    		});  	
  	};

});