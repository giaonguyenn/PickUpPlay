angular.module("PickUpPlayApp").controller("mainCtrl", function($scope, mainSrvc, $state) {

  angular.element(document).ready(function(){
    $("navbar").css("display", "none");
  });

  $scope.signIn = function (emailSignIn,passwordSignIn) {
  mainSrvc.signIn(emailSignIn,passwordSignIn)
    .then((response) => {
      $state.go("searchBy");
  	})
    .catch((err) => {
      // alert(err);
      // 'use strict';

      // window.addEventListener('load', function() {
      //   var form = document.getElementById('needs-validation');
      //   form.addEventListener('submit', function(event) {
      //     if (form.checkValidity() === false) {
      //       event.preventDefault();
      //       event.stopPropagation();
      //     }
      //     form.classList.add('was-validated');
      //   }, false);
      // }, false);
    });
  };

  $scope.signOut = mainSrvc.signOut;

});