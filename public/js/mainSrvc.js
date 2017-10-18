angular.module("PickUpPlayApp").service("mainSrvc", function($http, $q) {

	var baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="
	var apiKey = "AIzaSyDx3NmAEho6hkw_NSTWBZU3EFadH87jxRs";
	var map;
	var that = this;

	this.user = {};
	//SIGNING IN USER AND AUTHENTICATING WITH FIREBASE
    this.signIn = (emailSignIn, passwordSignIn) => {
    	return $q((resolve, reject) => {
	     	firebase.auth().signInWithEmailAndPassword(emailSignIn, passwordSignIn)
	            .then((response) => { 
	            	console.log(response)
	            	//Getting user by ID so it can be connected to whoever logs in
	            	return $http.get("/users/getUserById/" + response.uid)
	            		.then((response) => {
	            			this.user = response.data.pop();
	            			resolve();
	            		});
	            })
	            .catch(err=>{
	     			reject(err);
	     		});	
    	});
    };

	//CREATING USER AND SENDING INFO TO DATABASE/FIREBASE
	this.createUser = (firstname, email, lastname, username, password) => {
		return $q((resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(email, password)
				.then((user) => {
	            	this.user = {"uid": user.uid, "firstname": firstname, "email": user.email, "lastname": lastname, "username": username, "password": password};
					$http.post('/users/createUser', this.user);
	        		resolve();
	        		console.log(this.user);
        		})
        		.catch((err) => {
        			reject(err);
        		});	
		});
    };
    /* new Promise (resolve, reject){
		doo stuff here 
	  		if good stuff resolve,
	  		if bad stuff reject} */

   	//PULLING GAMES FROM DATABASE FOR SPORTSVIEW PAGE
   	this.getSports = () => {
   		return $http
   			.get("http://localhost:3000/sportsView/allSports")
   			.then((response) => {
   			const results = response.data;
   			return results;
   		})
   	};
	
	//SEARCHING FOR SPORTS BY ADDRESS
	this.searchAddress = function() {
		$(".searchbyAddress").css("display", "initial");
	};
	
	that.places = [];

	//GETTING MAP BY USING ADDRESS THAT USER INPUTS
	this.getMapByAddress = function(address) {
		return $http
		.get(baseUrl + address + "&key=" + apiKey)
		.then((response) => {
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

	      		that.places.push(place);

	        	var placeLoc = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};

	        	var marker = new google.maps.Marker({
	          		map: map,
	          		position: placeLoc
	        	});

				var contentString = place.name + "<br/><br/>" + place.vicinity + "<br/><br/>" + "<p> __ games currently in session</p><br/>" + "<p>Create game</p>" +
			  	'<a href="/#/gameView/' + place.id + '"><img border="0" align="center" style="width: 20px;float:right" src="./src/images/plusIcon.png"></a>';

        		var infowindow = new google.maps.InfoWindow({});

	        	google.maps.event.addListener(marker, 'click', function() {
	          		infowindow.setContent(contentString);
	          		infowindow.open(map, this);
	        	});
	      	};

      		initMap();
		});
	};

	this.createGame = (uid, game, players, time, courtid) => {
		let gameInfo = {uid, game, players, time, courtid}
            return $http.post('/users/createGame', gameInfo)
	};

	this.getCurrentGames = (place) => {
   		return $http
   			.get(`http://localhost:3000/games/currentGames/${place}`)
   			.then((response) => {
   			const results = response.data;
   			return results;
   		})
   	};

   	this.getUsername = (useruid) => {
   		console.log(useruid)
   		
   		const results = useruid.map( user => {
   			console.log(user)
   			return $http
   				.get("http://localhost:3000/user/username/" + user)
   				.then((response) => {   
   					console.log(response)
   					return response.data[0].username	
   				})
   		})
   		
		return results;
   	};

   	that.myGames = [];

   	this.getMyGames = (useruid) => {
   		return $http
   			.get(`/user/myGames/${useruid}`)
   			.then((response) => {
   				that.myGames = response.data;
   				console.log(that.myGames);
   				return response.data;
   			})
   	};

    this.signOut = () => {
        firebase.auth().signOut().then(() => {
            console.log(uid, 'Signed Out');
        })
    };

});