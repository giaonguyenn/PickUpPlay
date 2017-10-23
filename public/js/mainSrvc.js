angular.module("PickUpPlayApp").service("mainSrvc", function($http, $q, $state) {

	var baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="
	var apiKey = "AIzaSyDx3NmAEho6hkw_NSTWBZU3EFadH87jxRs";
	var map;

	var that = this;
	that.places = [];

	var searchTerms = [];

	// this.gamesCreated;

	this.user = {};
	//SIGNING IN USER AND AUTHENTICATING WITH FIREBASE
    this.signIn = (emailSignIn, passwordSignIn) => {
    	return $q((resolve, reject) => {
	     	firebase.auth().signInWithEmailAndPassword(emailSignIn, passwordSignIn)
	            .then((response) => { 
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

	this.submitImage = (image, uid) => {
		let defer = $q.defer();
	    const storageRef = firebase.storage().ref();
	    const uploadTask = storageRef.child("images/" + image.name).put(image);
	    uploadTask.on("state_changed", (snapshot) => {
	        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	        console.log("Upload is " + progress + "% done");
	        switch (snapshot.state) {
	            case firebase.storage.TaskState.RUNNING: // or ‘running’
	                console.log("Upload is running");
	                    break;
	            }
	    }, 

	    (error) => {

	    }, 

	    () => {
	        let imageUrl = [uploadTask.snapshot.downloadURL, uid];
	        return $http
	        	.post(`/user/image`, imageUrl)
	        	.then((response) => {
	        		let results = response.data[0].image;
	        		defer.resolve(results);
	        		return results;
	        	});
	    });
	    return defer.promise;
	};

	// this.getNumberOfGamesCreated = (uid) => {
	// 	return $http
	// 		.get("http://localhost:3000/games/gamesCreated")
	// 		.then((response) => {
	// 			console.log(response);
	// 		});
	// };

   	//PULLING GAMES FROM DATABASE FOR SPORTSVIEW PAGE
   	this.getSports = () => {
   		return $http
   			.get("http://localhost:3000/sportsView/allSports")
   			.then((response) => {
   				searchTerms = response.data.map(sport => {
   					return sport.search_term;
   				})
   			const results = response.data;
   			return results;
   		})
   	};

   	this.showSportsView = () => {
		$("sports-view").css("display", "initial");
   	};

	//GETTING MAP BY USING ADDRESS THAT USER INPUTS
	this.getMapByAddress = function(address, searchTerm) {
		return $http
		.get(baseUrl + address + "&key=" + apiKey)
		.then((response) => {
			var object = {
				lat: response.data.results[0].geometry.location.lat,
				lng: response.data.results[0].geometry.location.lng
			};

			function initMap () {
				var location = object;

				var styledMapType = new google.maps.StyledMapType(
            		[{"featureType":"landscape","stylers":[{"hue":"#F1FF00"},{"saturation":-27.4},{"lightness":9.4},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#0099FF"},{"saturation":-20},{"lightness":36.4},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#00FF4F"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FFB300"},{"saturation":-38},{"lightness":11.2},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#00B6FF"},{"saturation":4.2},{"lightness":-63.4},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#9FFF00"},{"saturation":0},{"lightness":0},{"gamma":1}]}],
            		{name: 'Styled Map'}
            	);
		        map = new google.maps.Map(document.getElementById("map"), {
		          	zoom: 12,
		          	center: location,
		          	mapTypeControlOptions: {
			            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
			                    'styled_map']
			        }
		        });

		        map.mapTypes.set('styled_map', styledMapType);
        		map.setMapTypeId('styled_map');
        		
		        var marker = new google.maps.Marker({
		        	map: map,
	          		animation: google.maps.Animation.DROP,
		          	position: location,
		          	icon: "./src/images/icon.png"
		        });
		        var pyrmont = new google.maps.LatLng(object.lat,object.lng);
		        service = new google.maps.places.PlacesService(map);
		     
				//loops through and places different icons depending on searchTerm		     
		        if(searchTerm == "all-sports") {
		        	searchTerms.forEach(term => {
						service.nearbySearch(
							{
								location: pyrmont, 
								keyword: term, 
								radius: 20000
							}, 
							(results, status) => {
								callback(results, status, term)
							});
		        	})
		        } else {
					service.nearbySearch(
						{
							location: pyrmont, 
							keyword: searchTerm, 
							radius: 20000
						}, 
						(results, status) => {
							callback(results, status, searchTerm)
						});
					}
		    };

		    function callback (results, status, keyword) {
		        if (status === google.maps.places.PlacesServiceStatus.OK) {
		        	for (var i = 0; i < results.length; i++) {
		           		createMarker(results[i], keyword);
		          	}
		        }
		    };

	      	function createMarker (place, keyword) {

	      		that.places.push(place);

	        	var placeLoc = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};

	        	var icon = "";
	        	switch(keyword) {
	        		case "basketball courts":
	        			icon = "./src/images/basketballIcon.png";
	        			break;
	        		case "biking trail":
	        			icon = "./src/images/bikingIcon.png";
	        			break;
	        		case "disc golf":
	        			icon = "./src/images/frisbeeIcon.png";
	        			break;
	        		case "recreation park":
	        			icon = "./src/images/soccerFootballIcon.png";
	        			break;
	        		case "tennis courts":
	        			icon = "./src/images/tennisIcon.png";
	        			break;
	        		case "volleyball courts":
	        			icon = "./src/images/volleyballIcon.png";
	        			break;
	        	}

	        	var marker = new google.maps.Marker({
	          		map: map,
	          		position: placeLoc,
	          		icon: icon,
	          		animation: google.maps.Animation.DROP
	        	});

				var contentString = 
					"<div style='background-color: #006D99; color: white; padding: 5px; width: 194px; text-transform: uppercase; font-weight: bold'><b>" + place.name + "</b></div>" + "<br/><br/>" + place.vicinity + "<br/><br/>" + "<p> __ games currently in session</p><br/>" + "<a href='/#/gameView/" + place.id + "'><p><i class='fa fa-plus-circle' aria-hidden='true'></i> Create/Join Games</p></a>";

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

   	that.myGames = [];

   	this.getMyGames = (useruid) => {
   		return $http
   			.get(`/user/myGames/${useruid}`)
   			.then((response) => {
   				console.log(response);
   				that.myGames = response.data.map(game => {
        			game.time = moment(game.time, 'h:mm a').format('h:mm A');
   					return game;
   				});
   		});
   	};

    this.signOut = () => {
        firebase.auth().signOut().then(() => {
            console.log(uid, 'Signed Out');
        })
    };

});