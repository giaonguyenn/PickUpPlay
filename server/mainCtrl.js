const moment = require('moment');

module.exports = {
	createUser: (req, res, next) => {
		req.app.get("db")
        	.create_user(req.body);
	},

	getUserById: (req, res, next) => {
		req.app.get("db")
			.get_user_by_id(req.params.id)
			.then((response) => {
				res.status("200").send(response);
			});
	},

	submitImage: (req, res, next) => {
		req.app.get("db")
			.submit_image(req.body)
			.then((response) =>{
				res.json(response);
			});
	},

	getSports: (req, res, next) => {
		// const dbInstance = req.app.get("db");
		// return dbInstance.get_sports()
		// 	.then(sports => res.status("200").send(sports));
		req.app.get("db")
			.get_sports()
			.then((sports) => {
				res.status("200").send(sports)
			});
	},

	createGame: (req, res, next) => {
		console.log(req.body.time);
		req.body.time = moment(req.body.time).format('h:mm A');
		console.log(req.body.time);
		req.app
			.get("db")
			.create_game(req.body)
			.then((response) => {
				res.json(response);
			});
	},

	// getNumberOfGamesCreated: (req, res, next) => {
	// 	req.app.get("db")
	// 		.get_number_of_games_created(req.body)
	// 		.then((response) => {
	// 			res.status("200").send(numberOfGamesCreated)
	// 		});
	// }, 

	getCurrentGames: (req, res, next) => {
		req.app.get("db")
			.get_current_games(req.params.id)
			.then((currentgames) => {
				res.status("200").send(currentgames);
			});
	},

	getMyGames: (req, res, next) => {
		req.app
			.get("db")
			.get_my_games(req.params.id)
			.then((myGames) => {
				res.status("200").send(myGames);
			});
	}
};