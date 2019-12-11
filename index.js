const fs = require("fs");
let Crawler = require("crawler");
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

// Change connection info based on your mySQL setup
var pool = mysql.createPool({
	connectionLimit: 20,
	host: "localhost",
	user: "weWrkApp",
	password: process.env.PASSWORD,
	database: "wewrk",
	multipleStatements: true
});

// DATABASE
const wrkDB = require('./wrkDB.js');

const provinces = ["british+columbia", "alberta", "saskatchewan", "manitoba", "ontario", "quebec+province", "New+Brunswick", "Prince+Edward+Island", "Nova+Scotia", "Newfoundland+and+Labrador", "Yukon", "Northwest+Territories", "Nunavut"];

const fileStream = fs.createWriteStream(".\\logs\\jobs.json");

let c = new Crawler({
    maxConnections: 20,
});
provinces.forEach(function(location) {
    c.queue([{
        uri: 'https://ca.indeed.com/jobs?q=&l=' + location + '&fromage=1&limit=50&start=0',
        jQuery: true,
        callback: initSearchResults,
        location: location
    }]);
});

function initSearchResults(error, res, done) {
    if (error) {
        console.log(error);
    } else {
        console.log('Grabbed', res.body.length, 'bytes');
        let $ = res.$;
        jobCount = $("#searchCountPages").first().text();  // Expected Page 1 of 260 Jobs   
        //extract number of jobs and strip comma for large numbers      
        let totalJobsString = RegExp("(\\d*,?\\d*) jobs").exec(jobCount.trim());
        if (totalJobsString == null) {
            return;
        }
        totalJobsString[1] = totalJobsString[1].replace(',', '');
        
        //parse into int for ease of use
        let totalJobs = parseInt(totalJobsString[1]);
        console.log(jobCount);
        // limit to 1000 jobs
        console.log("Location: " + res.options.location);
        console.log("Total before limit: " + totalJobs);
        totalJobs = Math.min(totalJobs, 1000);
        console.log("Total after limit: " + totalJobs);
        
        for (let index = 0; index < totalJobs; index = index + 50) {
            pullJobDetails(`https://ca.indeed.com/jobs?q=&l=${res.options.location}&fromage=1&limit=50&start=${index}`)
        }
    }
    done();
}

function pullJobDetails(url) {
    c.queue([{
        uri: url,
        jQuery: true,
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                let $ = res.$;
                let eachJob = $("a.jobtitle");

                eachJob.each(function () {
                    createJobObject($(this).text().trim(), $(this).attr('href'))
                })
            }
            done();
        }
    }])
}

function createJobObject(jobTitle, jobLink) {
    const url = `https://ca.indeed.com${jobLink}`;
    c.queue([{
        uri: url,
        jQuery: {
            name: 'cheerio',
            options: {
                normalizeWhitespace: true,
            }
        },

        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                console.log('\n--------\nGrabbed', res.body.length, 'bytes');
                let $ = res.$;
                console.log(typeof($));
                if ($ == undefined) {
                    done();
                }
                let jobDescription = $(".jobsearch-jobDescriptionText").first().html();
                let jobLocation = $('div[class*="icl-IconFunctional--location"]').next().text();
                let jobSalary = $('div[class*="icl-IconFunctional--salary"]').next().text();
                let jobType = $('div[class*="icl-IconFunctional--jobs"]').next().text();
                let jobCompany = $('div[class*="InlineCompanyRating"]').first().children().first().text();

                // Assign job attributes based on the page, experienceLevel is set in the database
                let jobObject = JSON.stringify({
                    title: jobTitle,
                    link: jobLink,
                    description: jobDescription,
                    location: jobLocation,
                    company: jobCompany,
                    pay: jobSalary,
                    jobType: jobType
                });
                if (jobDescription) {
                    if (!jobLink.includes("/pagead/")) {
                        fileStream.write(jobObject + ",\n");
                    wrkDB.insertPosting(pool, JSON.parse(jobObject));
                    }
                }
            }
            done();
        }
    }]);
}
