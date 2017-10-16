const express = require("express");
const {json} = require("body-parser");
const massive = require("massive"); //takes your db and allows you to handle sql calls 
const {dbUser, dbPass, database, domain, clientID, clientSecret, secret} = require("./server/config.js");
const session = require("express-session"); //saves users' id to a cookie

const mainCtrl = require("./server/mainCtrl.js");

const app = express();

const port = 3000;

app.use(json());
app.use(session({
	secret: secret,
	resave: false,
 	saveUninitialized: false
}));

app.use(express.static("./public"));
const connectionString = `postgres://${dbUser}:${dbPass}@localhost/${database}`;
massive(connectionString).then(db => {
	app.set("db", db);
});
const db = app.get("db");

/////////////////Endpoints/////////////////
app.post("/users/createUser", (req,res,next) => {
	console.log(req.session);
	 req.app
        .get("db")
        .create_user(req.body);
});

app.get("/sportsView/allSports", mainCtrl.getSports);

app.post("/users/createGamee", (req, res, next) => {
	req.app
		.get("db")
		.create_game(req.body);
});

app.get("users/getUsers", (req, res, next) => {
	req.app
		.get("db")
		.get_users(req.body);
});

app.listen(port, () => {console.log(`Server listening on port ${port}`);
});