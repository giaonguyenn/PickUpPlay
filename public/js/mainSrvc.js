angular.module("PickUpPlayApp").service("mainSrvc", function($http, $q, $state) {

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
		          	zoom: 12,
		          	center: location
		        });
		        var marker = new google.maps.Marker({
		          	position: location,
		          	map: map
		        });
		        var pyrmont = new google.maps.LatLng(object.lat,object.lng);
		        service = new google.maps.places.PlacesService(map);
				service.nearbySearch({location: pyrmont, keyword: "basketball courts", radius: 20000}, 
					(results, status) => {
						callback(results, status, "basketball courts")
					});
				service.nearbySearch({location: pyrmont, keyword: "biking trail", radius: 20000}, 
					(results, status) => {
						callback(results, status, "biking trail")
					});
				service.nearbySearch({location: pyrmont, keyword: "disc golf", radius: 20000}, 
					(results, status) => {
						callback(results, status, "disc golf")
					});
				service.nearbySearch({location: pyrmont, keyword: "recreation park", radius: 20000}, 
					(results, status) => {
						callback(results, status, "recreation park")
					});
				service.nearbySearch({location: pyrmont, keyword: "tennis courts", radius: 20000}, 
					(results, status) => {
						callback(results, status, "tennis courts")
					});
				service.nearbySearch({location: pyrmont, keyword: "volleyball courts", radius: 20000}, 
					(results, status) => {
						callback(results, status, "volleyball courts")
					});
		    };

		    function callback (results, status, keyword) {
		        if (status === google.maps.places.PlacesServiceStatus.OK) {
		        	for (var i = 0; i < results.length; i++) {
		           		createMarker(results[i], keyword);
		          	}
		        }
		    };

	      	function createMarker (place, keyword) {
	      		// placeLoc is pulling in coordinates for location that user inputs
	      		// console.log("init map keywords", initMap)

	      		console.log(keyword);

	      		that.places.push(place);

	        	var placeLoc = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};

	        	var icon = "";
	        	switch(keyword) {
	        		case "basketball courts":
	        			icon = "orange";
	        			break;
	        		case "biking trail":
	        			icon = "yellow";
	        			break;
	        		case "disc golf":
	        			icon = "pink";
	        			break;
	        		case "recreation park":
	        			icon = "blue";
	        			break;
	        		case "tennis courts":
	        			icon = "green";
	        			break;
	        		case "volleyball courts":
	        			icon = "purple";
	        			break;
	        	}
	        	icon = "http://maps.google.com/mapfiles/ms/icons/" + icon + "-dot.png";

	        	var marker = new google.maps.Marker({
	          		map: map,
	          		position: placeLoc,
	          		icon: icon,
	          		animation: google.maps.Animation.DROP
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

   	that.myGames = [];

   	this.getMyGames = (useruid) => {
   		return $http
   			.get(`/user/myGames/${useruid}`)
   			.then((response) => {
   				that.myGames = response.data;
   				return response.data;
   			})
   	};

    this.signOut = () => {
        firebase.auth().signOut().then(() => {
            console.log(uid, 'Signed Out');
        })
    };

});