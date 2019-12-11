// weWrk API Backend

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require('mysql');
const wrkDB = require("./wrkDB");
const dotenv = require('dotenv');
dotenv.config();

// Change connection info based on your mySQL setup
var pool = mysql.createPool({
	connectionLimit: 20,
	host: "localhost",
	user: "weWrkApp",// the api account only has SELECT access to the postings table
	password: process.env.APPPASSWORD,// passwords are defined in a .env file located in the root directory
	database: "wewrk",
	multipleStatements: true
});

const app = express();
const portNum = 9001;
app.use(bodyParser.json());
app.use(cors());

/* API endpoint for all search functions
 * Recieves a query from the frontend in the format: ?q={search terms}&pay={minimum salary}&type={job type}&experience={experience level}&sort={sort priority}&offset={page offset}
 * All fields can be left blank and will either be unused in the search or set to a default value
 */
app.get("/search", async (req, res) =>  {
    console.log("Serving search");

    // grab and sanitize terms from query, splitting into an array at spaces
    let terms = req.query.terms.replace(/[!@#$\^&*()\-\_=+;<>,.\'\"]|\%(?!20)\d\d/g,'').split(' ');// input from search bar

    //check if any terms match locations in our database, this splits search input into location(array of strings) and terms(string)
    //eg "cashier edmonton walmart" becomes ["cashier", "walmart"] and "edmonton"
    wrkDB.findLocation(pool, terms, function(err, terms, location) {
        if (err) throw err;
        console.log(terms, location);
    
        let pay = req.query.pay;// input from dropdown, minimum salary threshold for search
        let type = req.query.type;// input from dropdown, job type eg. full-time, part-time
        let experience = req.query.experience;//input from dropdown, experience level required
        let offset = req.query.offset;// determined by frontend, page offset to allow for infinite scrolling, multiple of 10
        let sort = req.query.sort;// input from dropdown, sorting method, can be 'date' or 'relevance'

        // set missing search elements to default value
        location = (typeof location === 'undefined') ? '' : location;
        pay = (typeof pay === 'undefined' || pay == '') ? 0 : pay;
        type = (typeof type === 'undefined') ? '' : type;
        experience = (typeof experience === 'undefined') ? '' : experience;
        sort = (typeof sort === 'undefined') ? 'relevance' : sort;

        // search the database using the query attributes
        wrkDB.selectPostingAdvanced(pool, terms, location, pay, type, experience, sort, offset, function(err, resultObject) {
            if (err) console.log(err);
            // send SELECT results to frontend
            res.send(JSON.stringify(resultObject))
        });
    });
})

console.log("Application listening on Port", portNum);
app.listen(portNum);
