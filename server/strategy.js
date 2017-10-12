// //responsible for creating and exporting new Auth0strategy that uses values from config.js

// const Auth0Strategy = require("passport-auth0");
// const config = require(`${__dirname}/config.js`);
// const {domain, clientID, clientSecret} = config;
// const db = app.get("db");

// module.exports = new Auth0Strategy ({
// 	domain: domain,
// 	clientID: clientID,
// 	clientSecret: clientSecret,
// 	callbackURL: "/login"
// }, 
// 	function (accessToken, refreshToken, extraParams, profile, done) {
// 		console.log(profile);
// 		db.getUserByAuthID([profile._json.sub])
// 		//accessToken is the token to call Auth0 API (not needed in the most cases)
// 		//extraParams.id_token has the JSON Web Token
// 		//profile has all the information from the user
// 	}
// );