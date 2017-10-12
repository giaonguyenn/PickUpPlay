const express = require("express");
const {json} = require("body-parser");
const massive = require("massive"); //takes your db and allows you to handle sql calls 
const {dbUser, dbPass, database, domain, clientID, clientSecret} = require("./server/config.js");

const app = express();

const port = 3000;

app.use(json());

app.use(express.static("./public"));
const connectionString = `postgres://${dbUser}:${dbPass}@localhost/${database}`;
massive(connectionString).then(db => {
	app.set("db", db);
});
const db = app.get("db");

/////////////////Endpoints/////////////////
app.post("/users/createUser", (req,res,next)=> {
	console.log(req.body)
	 req.app
        .get("db")
        .create_user(req.body);
})

app.listen(port, () => {console.log(`Server listening on port ${port}`);
});