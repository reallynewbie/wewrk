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

app.get("/search", (req, res) =>  {
    console.log("Serving search");

    // grab elements from query
    let terms = req.query.terms.split(' ');// input from search bar
    //TODO: implement multi-field search, currently assuming terms contains 'title%20location%20company' ('%20%20' for empty search bar)
    // Each field can be blank but spaces are needed, eg. 'location%20company' wont work but '%20location%20company' will
    let title = terms[0];
    let location = terms[1];
    let company = terms[2];
    let pay = req.query.pay;// input from dropdown
    let type = req.query.type;// input from dropdown
    let experience = req.query.experience;
    let offset = req.query.offset;// determined by frontend

    // handle missing elements
    title = (typeof title === 'undefined') ? '' : title;
    pay = (typeof pay === 'undefined' || pay == '') ? 0 : pay;
    type = (typeof type === 'undefined') ? '' : type;
    experience = (typeof experience === 'undefined') ? '' : experience;

    wrkDB.selectPosting(wrkDB.pool, title, location, company, pay, type, experience, offset, function(err, results) {
        if (err) console.log(err);
        res.send(JSON.stringify({
            results/*: [
                {
                    jobID: data.,
                    jobTitle: "Frontend web application developer",
                    companyName: "Test Company",
                    location: "Edmonton, AB",
                    experienceLevel: "Junior Entry Level",
                    jobType: "Full Time",
                    pay: "$27.75/hr",
                    postedDate: "10/29/2019",
                    jobDescription: "HTML HERE",
                    link: "Insert link to the apply button here"
                }
            ],*/,
            //TODO: total and exclusions
            totalResults: 123, 
            excludedType: 0,
            excludedPay: 0,
            excludedExperience: 0,
        }))
    });
})

console.log("Application listening on Port", portNum);
app.listen(portNum);