angular.module("PickUpPlayApp").service("mainSrvc", function($http) {

	var baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="
	var apiKey = "AIzaSyDx3NmAEho6hkw_NSTWBZU3EFadH87jxRs";
	
	this.searchAddress = function() {
		$(".searchbyAddress").css("display", "initial");
	};
	
	this.getMapByAddress = function(address) {
		return $http
		.get(baseUrl + address + "&key=" + apiKey)
		.then(function(response) {
			var object = {
				lat: response.data.results[0].geometry.location.lat,
				lng: response.data.results[0].geometry.location.lng
			};

			function initMap () {
				var location = object;
		        var map = new google.maps.Map(document.getElementById('map'), {
		          	zoom: 11,
		          	center: location
		        });
		        var marker = new google.maps.Marker({
		          	position: location,
		          	map: map
		        });

		        var pyrmont = new google.maps.LatLng(object.lat,object.lng);
		        	service = new google.maps.places.PlacesService(map);
					service.nearbySearch({location: pyrmont, keyword: "basketball courts", radius: 5000}, (res) => {
						console.log(res);				});
		    };

		    initMap();

		});
	};

});