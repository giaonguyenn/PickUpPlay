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
		req.app
			.get("db")
			.create_game(req.body)
			.then((response) => {
				res.json(response);
			});
	},

	getCurrentGames: (req, res, next) => {
		req.app.get("db")
			.get_current_games(req.params.id)
			.then((currentgames) => {
				res.status("200").send(currentgames);
			});
	},

	getUsername: (req, res, next) => {
		req.app.get("db")
			.get_username(req.params.id)
			.then((username) => {
				res.status("200").send(username);
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