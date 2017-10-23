angular.module("PickUpPlayApp").controller("myGamesCtrl", function($scope, mainSrvc, $state, $stateParams) {

	angular.element(document).ready(function(){
    	$("navbar").css("display", "initial");

    	$('a#click-a').click(function(){
      		$('.nav').toggleClass('nav-view');
   		 });
  	});

	$scope.myGames = mainSrvc.myGames;

	// $scope.placeName = mainSrvc.placeName;
	// console.log($scope.placeName);
	// $scope.placeName = obj.placeName;
	// console.log($scope.placeName);

});