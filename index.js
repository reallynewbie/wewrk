/* Webscrapes indeed, pulling jobs from all of canada and parsing them into our database
 * Run every night at midnight pulling all postings from the last 24 hours
 */

const fs = require("fs");
let Crawler = require("crawler");
const mysql = require('mysql');
const dotenv = require('dotenv');
const wrkDB = require('./wrkDB.js');

dotenv.config();

// Change connection info based on your mySQL setup
var pool = mysql.createPool({
	connectionLimit: 20,
	host: "localhost",
	user: "root",
	password: process.env.PASSWORD,// passwords are defined in a .env file located in the root directory
	database: "wewrk",
	multipleStatements: true
});


// log scraped jobs
const fileStream = fs.createWriteStream(".\\logs\\jobs.json");

// initialize crawler with 20 active agents
let c = new Crawler({
    maxConnections: 20,
});

// run the crawler on search results for each province
const provinces = ["british+columbia", "alberta", "saskatchewan", "manitoba", "ontario", "quebec+province", "New+Brunswick", "Prince+Edward+Island", "Nova+Scotia", "Newfoundland+and+Labrador", "Yukon", "Northwest+Territories", "Nunavut"];
provinces.forEach(function(location) {
    c.queue([{
        uri: 'https://ca.indeed.com/jobs?q=&l=' + location + '&fromage=1&limit=50&start=0',
        jQuery: true,
        callback: initSearchResults,
        location: location
    }]);
});

// Searches for jobs in a province, gathering the html of results summary pages
function initSearchResults(error, res, done) {
    if (error) {
        console.log(error);
    } else {
        console.log('Grabbed', res.body.length, 'bytes');
        let $ = res.$;
        jobCount = $("#searchCountPages").first().text();  // Gets total jobs matching the search, formatted as "Page 1 of X jobs" 
        //extract number of jobs and strip comma for large numbers      
        let totalJobsString = RegExp("(\\d*,?\\d*) jobs").exec(jobCount.trim());
        if (totalJobsString == null) {
            return;
        }
        totalJobsString[1] = totalJobsString[1].replace(',', '');
        
        //parse total into int for ease of use
        let totalJobs = parseInt(totalJobsString[1]);
        console.log(jobCount);

        // limit to 1000 jobs(indeed will only return up to 1000 jobs for any search, pages beyond this will be entirely duplicates)
        console.log("Location: " + res.options.location);
        console.log("Total before limit: " + totalJobs);
        totalJobs = Math.min(totalJobs, 1000);
        console.log("Total after limit: " + totalJobs);
        
        // gather html of every page(50 jobs) from this province
        for (let index = 0; index < totalJobs; index = index + 50) {
            pullJobDetails(`https://ca.indeed.com/jobs?q=&l=${res.options.location}&fromage=1&limit=50&start=${index}`)
        }
    }
    done();
}

// pull the title and link of each job posting in a page of results
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

                // scrape each job
                eachJob.each(function () {
                    createJobObject($(this).text().trim(), $(this).attr('href'))
                })
            }
            done();
        }
    }])
}

// Visit an individual postings page, parsing the html and pulling needed attributes
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
                // Scrape isolated attributes from a job posting
                let jobDescription = $(".jobsearch-jobDescriptionText").first().html();
                let jobLocation = $('div[class*="icl-IconFunctional--location"]').next().text();
                let jobSalary = $('div[class*="icl-IconFunctional--salary"]').next().text();
                let jobType = $('div[class*="icl-IconFunctional--jobs"]').next().text();
                let jobCompany = $('div[class*="InlineCompanyRating"]').first().children().first().text();

                // Assign job attributes based on the page, experienceLevel is set in the database based on keywords in the description
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
                    // skip any sponsored postings, these tend to ignore search filtering and are often dupicates
                    if (!jobLink.includes("/pagead/")) {
                        fileStream.write(jobObject + ",\n");
                        // insert the postings into the database
                        wrkDB.insertPosting(pool, JSON.parse(jobObject));
                    }
                }
            }
            done();
        }
    }]);
}
