angular.module("PickUpPlayApp").controller("mapViewCtrl", function($scope, mainSrvc) {
		//Initializing Map
		var initMap = function () {
			console.dir(google);
        	var uluru = {lat: 32.77, lng: -96.79};
        	var map = new google.maps.Map(document.getElementById('map'), {
          		zoom: 4,
          		center: uluru
        	});
        	var marker = new google.maps.Marker({
          	position: uluru,
          	map: map
        	});

        	var pyrmont = new google.maps.LatLng(32.77,-96.79);
        	console.log(pyrmont);
        	service = new google.maps.places.PlacesService(map);
			service.nearbySearch({location: pyrmont, keyword: "basketball", radius: 5000}, (res) => {
				console.log(res);
			});
        };

      	initMap();

});