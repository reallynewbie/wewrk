const fs = require("fs");
let Crawler = require("crawler");

// DATABASE
const mysql = require('mysql');
const wrkDB = require('./wrkDB.js');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "wewrk"
});

var totUnique = 0;
var totPulled = 0;
var seenJobs = [];

//const location = "Edmonton%2C+AB"
const location = "alberta";
const jobTitle = "";
const qualificationsRegEx = new RegExp("Qualifications|What are we looking for|What You Bring to the Role|Requirements.*?<ul>(.*?)<\/ul>", "g");
// const qualificationsRegEx = new RegExp("Qualifications.*?<ul>(.*?)<\/ul>", "g");
//<b>(Qualifications|What are we looking for|What You Bring to the Role|Requirements|Must Haves|Experience)(.*?)<b>

const curDate = new Date();
//const fileStream = fs.createWriteStream(".\\logs\\jobs_" + curDate.toTimeString().slice(0, 8) + ".json");
const fileStream = fs.createWriteStream(".\\logs\\jobs.json");



let c = new Crawler({//confirm crawler flow
    maxConnections: 10,
});

c.queue([{
    uri: 'https://ca.indeed.com/jobs?q=' + encodeURI(jobTitle) + '&l=' + location + '&fromage=1&limit=50&start=0',
    jQuery: true,
    callback: initSearchResults
}]);

function initSearchResults(error, res, done) {
    if (error) {
        console.log(error);
    } else {
        console.log('Grabbed', res.body.length, 'bytes');
        let $ = res.$;
        jobCount = $("#searchCountPages").first().text();  // Expected Page 1 of 260 Jobs   
        //extract number of jobs and strip comma for large numbers      
        let totalJobsString = RegExp("(\\d*,?\\d*) jobs").exec(jobCount.trim());
        totalJobsString[1] = totalJobsString[1].replace(',', '');
        
        //parse into int for ease of use
        let totalJobs = parseInt(totalJobsString[1]);
        console.log(jobCount);
        // limit to 1000 jobs
        console.log("Total before limit: " + totalJobs);
        totalJobs = Math.min(totalJobs, 1000);
        console.log("Total after limit: " + totalJobs);
        
        for (let index = 0; index < totalJobs; index = index + 50) {
            pullJobDetails(`https://ca.indeed.com/jobs?q=${jobTitle}&l=${location}&fromage=1&limit=50&start=${index}`)
        }
        //pool.end();
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
            name: 'cheerio',//?
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
                let jobDescription = $(".jobsearch-jobDescriptionText").first().html();
                console.log(typeof(jobDescription));
                let jobObject = JSON.stringify({
                    title: jobTitle,
                    link: jobLink,
                    description: jobDescription,
                    regex: qualificationsRegEx.test(jobDescription),
                    qual: qualificationsRegEx.exec(jobDescription)
                });
                if (jobDescription) {
                    let jobIntro = jobDescription.substring(0, 400);
                    console.log(jobIntro);
                    totPulled++;
                    console.log("Total Jobs: " + totPulled);
                    //if (seenJobs.findIndex(element => element.includes(jobIntro)) == -1) {
                    if (!jobLink.includes("/pagead/")) {
                        fileStream.write(jobObject + ",\n");
                        //seenJobs.push(jobIntro);
                        totUnique++;
                        console.log("Unique Jobs: " + totUnique);
                    //wrkDB.insertPosting(pool, JSON.parse(jobObject));
                    // if (!qualificationsRegEx.test(jobDescription)) {
                    //     let jobObject = jobDescription;
                    //     fileStream.write(jobObject + "\n-------------------------\n");
                    // }
                    }
                //console.log(qualificationsRegEx.test(jobDescription)); 
                }
                           
            }
            done();
        }
    }]);
}
