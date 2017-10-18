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
app.post("/users/createUser", mainCtrl.createUser);

app.get("/users/getUserById/:id", mainCtrl.getUserById);

app.get("/sportsView/allSports", mainCtrl.getSports);

app.post("/users/createGame", mainCtrl.createGame);

app.get("/games/currentGames/:id", mainCtrl.getCurrentGames);

app.get("/user/myGames/:id", mainCtrl.getMyGames);

app.listen(port, () => {console.log(`Server listening on port ${port}`);
});