angular.module("PickUpPlayApp").service("mainSrvc", function($http, $q) {

	var baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="
	var apiKey = "AIzaSyDx3NmAEho6hkw_NSTWBZU3EFadH87jxRs";
	var map;
	this.user = {};

	//SIGNING IN USER AND AUTHENTICATING WITH FIREBASE
    this.signIn = (emailSignIn, passwordSignIn) => {
        return firebase.auth().signInWithEmailAndPassword(emailSignIn, passwordSignIn)
            .then(() => {});
    };

	//CREATING USER AND SENDING INFO TO DATABASE/FIREBASE
	this.createUser = (firstName, email, lastName, username, password) => {
		return $q((resolve) => {
			firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
            	this.user = {"uid": user.uid, "firstName": firstName, "email": user.email, "lastName": lastName, "username": username, "password": password};
            	console.log(this);
				$http.post('/users/createUser', this.user);
        		resolve();
        	});	
		});
        
    };

   	//PULLING GAMES FROM DATABASE FOR SPORTSVIEW PAGE
   	this.getSports = () => {
   		return $http({
   			method: "GET",
   			url: "http://localhost:3000/sportsView/allSports"
   		}).then((response) => {
   			const results = response.data;
   			return results;
   		})
   	};

    this.createGame = (game, numberOfPlayers, time) => {
		let gameInfo = {"game": game, "players": numberOfPlayers, "time": time}
            return $http.post('/users/createGame', gameInfo)
	};

    // this.getUser = () => {
    // 	return $http.get("/users/getUser", )
    // }

    this.signOut = () => {
        firebase.auth().signOut().then(() => {
            console.log(uid, 'Signed Out');
        })
    };
	
	//SEARCHING FOR SPORTS BY ADDRESS
	this.searchAddress = function() {
		$(".searchbyAddress").css("display", "initial");
	};
	
	//GETTING MAP BY USING ADDRESS THAT USER INPUTS
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
		        map = new google.maps.Map(document.getElementById("map"), {
		          	zoom: 11,
		          	center: location
		        });
		        var marker = new google.maps.Marker({
		          	position: location,
		          	map: map
		        });
		        var pyrmont = new google.maps.LatLng(object.lat,object.lng);
		        	service = new google.maps.places.PlacesService(map);
					service.nearbySearch({location: pyrmont, keyword: "volleyball courts", radius: 10000}, callback
				);
		    };

		    function callback (results, status) {
		        if (status === google.maps.places.PlacesServiceStatus.OK) {
		        	for (var i = 0; i < results.length; i++) {
		           		createMarker(results[i]);
		          	}
		        }
		    };

	      	function createMarker (place) {
	      		// placeLoc is pulling in coordinates for location that user inputs
	        	var placeLoc = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};

	        	var marker = new google.maps.Marker({
	          		map: map,
	          		position: placeLoc
	        	});

				var contentString = place.name + "<br/><br/>" + place.vicinity + "<br/><br/>" + "<p> __ games currently in session</p><br/>" + "<p>Create game</p>" +
			  	'<a href="/#/gameView"><img border="0" align="center" style="width: 20px;float:right" src="./src/images/plusIcon.png"></a>';

        		var infowindow = new google.maps.InfoWindow({});

	        	google.maps.event.addListener(marker, 'click', function() {
	          		infowindow.setContent(contentString);
	          		infowindow.open(map, this);
	        	});
	      	};

      		initMap();
		});
	};

});



/*
	new Promise (resolve, reject){
	  /*doo stuff here /
	  	if good stuff resolve,
	  	if bad stuff reject
	}

*/