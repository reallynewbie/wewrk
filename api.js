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

console.log("Application listening on Port", portNum);
app.listen(portNum);
