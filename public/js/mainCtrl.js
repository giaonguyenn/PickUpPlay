angular.module("PickUpPlayApp").controller("mainCtrl", function($scope, mainSrvc, $state) {

  $scope.signIn = function (emailSignIn,passwordSignIn) {
  mainSrvc.signIn(emailSignIn,passwordSignIn)
    .then((response) => {
      $state.go("searchBy");
  	})
    .catch((err) => {
      alert(err);
      'use strict';

      window.addEventListener('load', function() {
        var form = document.getElementById('needs-validation');
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      }, false);
    });
  };

  $scope.signOut = mainSrvc.signOut;

});