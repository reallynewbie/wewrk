const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const wrkDB = require("./wrkDB");

const app = express();
const portNum = 9001;
app.use(bodyParser.json());
app.use(cors());

app.get("/example", (req, res) =>{ // Missing Async here because we won't have to wait.
    res.send(JSON.stringify({ // Stringify converts a JavaScript Object, into a string which I can run JSON.parse to get back an object
        testValue: "hello",
        someCounter: 123
    }))
})

app.get("/queryExample", (req, res) => {
    let testQuery = req.query.test;
    res.send("Hello, I received " + testQuery);  // Sending back a string, so no need to use stringify since I'm not sending an object
})

app.get("/search", async (req, res) =>  {
    console.log("Serving search");

    // grab elements from query
    let terms = req.query.terms.split(' ');// input from search bar
    
    wrkDB.findLocation(wrkDB.pool, terms, function(err, terms, location) {
        if (err) throw err;
        console.log(terms, location);
    

    //TODO: implement multi-field search, currently assuming terms contains 'title%20location%20company' ('%20%20' for empty search bar)
    // Each field can be blank but spaces are needed, eg. 'location%20company' wont work but '%20location%20company' will
    let title = terms[0];
    //let location = terms[1];
    let company = terms[2];
    let pay = req.query.pay;// input from dropdown
    let type = req.query.type;// input from dropdown
    let experience = req.query.experience;
    let offset = req.query.offset;// determined by frontend
    let sort = req.query.sort;// {sort, relevance, undefined}

    // handle missing elements
    title = (typeof title === 'undefined') ? '' : title;
    location = (typeof location === 'undefined') ? '' : location;
    company = (typeof company === 'undefined') ? '' : company;
    pay = (typeof pay === 'undefined' || pay == '') ? 0 : pay;
    type = (typeof type === 'undefined') ? '' : type;
    experience = (typeof experience === 'undefined') ? '' : experience;
    sort = (typeof sort === 'undefined') ? 'relevance' : sort;

    wrkDB.selectPosting(wrkDB.pool, title, location, company, pay, type, experience, sort, offset, function(err, resultObject) {
        if (err) console.log(err);
        res.send(JSON.stringify(resultObject))
    });
    });
})

console.log("Application listening on Port", portNum);
app.listen(portNum);
