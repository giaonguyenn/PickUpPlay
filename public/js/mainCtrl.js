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
      // $.extend({ alert: function (message, title) {
      //   $("<div>Test</div>").dialog( {
      //     buttons: { "Ok": function () { $(this).dialog("close"); } },
      //     close: function (event, ui) { $(this).remove(); },
      //     resizable: false,
      //     title: title,
      //     modal: true
      //     }).text(message);
      //   }
      // });
      alert(err);
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