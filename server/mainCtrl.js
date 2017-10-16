module.exports = {
	getSports: (req, res, next) => {
		const dbInstance = req.app.get("db");
		return dbInstance.get_sports()
			.then(sports => res.status("200").send(sports));
	}
};