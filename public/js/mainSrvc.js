angular.module("PickUpPlayApp").service("mainSrvc", function($http) {

	var baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="
	var apiKey = "AIzaSyDx3NmAEho6hkw_NSTWBZU3EFadH87jxRs";
	
	this.searchZip = function() {
		$(".searchbyZip").css("display", "initial");
	};
	
	this.getMapByZip = function(zipCode) {
		return $http
		.get(baseUrl + zipCode + "&key=" + apiKey)
		.then(function(response) {
			var object = {
				lat: response.data.results[0].geometry.location.lat,
				lng: response.data.results[0].geometry.location.lng
			};

			function initMap () {
				var uluru = object;
		        var map = new google.maps.Map(document.getElementById('map'), {
		          	zoom: 2,
		          	center: uluru
		        });
		        var marker = new google.maps.Marker({
		          	position: uluru,
		          	map: map
		        });

		        var pyrmont = new google.maps.LatLng(object.lat,object.lng);
		        	service = new google.maps.places.PlacesService(map);
					service.nearbySearch({location: pyrmont, keyword: "basketball", radius: 5000}, (res) => {
				});
		    };

		    initMap();

		});
	};

});