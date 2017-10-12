angular.module("PickUpPlayApp").service("mainSrvc", function($http) {

	var baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="
	var apiKey = "AIzaSyDx3NmAEho6hkw_NSTWBZU3EFadH87jxRs";
	var map;

	this.createUser = (firstName, email, lastName, username, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
            let userInfo = {"uid": user.uid, "firstName": firstName, "email": user.email, "lastName": lastName, "username": username, "password": password}
            console.log(userInfo)
            return $http.post('/users/createUser', userInfo)
        })
    };

    this.signIn = (emailSignIn, passwordSignIn) => {
        return firebase.auth().signInWithEmailAndPassword(emailSignIn, passwordSignIn)
            .then(() => {})
    };

    this.signOut = () => {
        firebase.auth().signOut().then(() => {
            console.log(uid, 'Signed Out');
        })
    };
	
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
		        map = new google.maps.Map(document.getElementById('map'), {
		          	zoom: 11,
		          	center: location
		        });
		        var marker = new google.maps.Marker({
		          	position: location,
		          	map: map
		        });
		        var pyrmont = new google.maps.LatLng(object.lat,object.lng);
		        	service = new google.maps.places.PlacesService(map);
					service.nearbySearch({location: pyrmont, keyword: "volleyball courts", radius: 5000}, callback
				);
		    };

		    function callback(results, status) {
		        if (status === google.maps.places.PlacesServiceStatus.OK) {
		        	for (var i = 0; i < results.length; i++) {
		           		createMarker(results[i]);
		          	}
		        }
		    };

	      	function createMarker(place) {
	      		// console.log(place);
	        	var placeLoc = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
	        	var marker = new google.maps.Marker({
	          		map: map,
	          		position: placeLoc
	        	});

				var contentString = place.name + " - " + place.rating + "</br></br>" + place.vicinity + "</br> </br>";

        		var infowindow = new google.maps.InfoWindow({});

	        	google.maps.event.addListener(marker, 'click', function() {
	          		infowindow.setContent(contentString);
	          		infowindow.open(map, this);
	        	});
	      	}

      		initMap();
		});
	};

});