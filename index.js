const fs = require("fs");
let Crawler = require("crawler");

// DATABASE
const wrkDB = require('./wrkDB.js');

const provinces = ["british+columbia", "alberta", "saskatchewan", "manitoba", "ontario", "quebec+province", "New+Brunswick", "Prince+Edward+Island", "Nova+Scotia", "Newfoundland+and+Labrador", "Yukon", "Northwest+Territories", "Nunavut"];
const jobTitle = "";
const qualificationsRegEx = new RegExp("Qualifications|What are we looking for|What You Bring to the Role|Requirements.*?<ul>(.*?)<\/ul>", "g");
// const qualificationsRegEx = new RegExp("Qualifications.*?<ul>(.*?)<\/ul>", "g");
//<b>(Qualifications|What are we looking for|What You Bring to the Role|Requirements|Must Haves|Experience)(.*?)<b>

//const fileStream = fs.createWriteStream(".\\logs\\jobs_" + curDate.toTimeString().slice(0, 8) + ".json");
const fileStream = fs.createWriteStream(".\\logs\\jobs.json");

let c = new Crawler({
    maxConnections: 20,
});
provinces.forEach(function(location) {
    c.queue([{
        uri: 'https://ca.indeed.com/jobs?q=' + encodeURI(jobTitle) + '&l=' + location + '&fromage=1&limit=50&start=0',
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
            pullJobDetails(`https://ca.indeed.com/jobs?q=${jobTitle}&l=${res.options.location}&fromage=1&limit=50&start=${index}`)
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
                let jobDescription = $(".jobsearch-jobDescriptionText").first().html();
                //let jobLocation = $(".jobsearch-JobMetadataHeader-iconLabel").first().text();
                let jobLocation = $('div[class*="icl-IconFunctional--location"]').next().text();
                console.log("Location: " + jobLocation);
                let jobSalary = $('div[class*="icl-IconFunctional--salary"]').next().text();
                console.log("Pay: " + jobSalary);
                let jobType = $('div[class*="icl-IconFunctional--jobs"]').next().text();
                console.log("Type: " + jobType);
                let jobCompany = $('div[class*="InlineCompanyRating"]').first().children().first().text();
                console.log("Company: " + jobCompany);

                // Assign job attributes based on the page, experienceLevel is set in the database
                let jobObject = JSON.stringify({
                    title: jobTitle,
                    link: jobLink,
                    description: jobDescription,
                    location: jobLocation,
                    company: jobCompany,
                    pay: jobSalary,
                    jobType: jobType,
                    regex: qualificationsRegEx.test(jobDescription),
                    qual: qualificationsRegEx.exec(jobDescription)
                });
                if (jobDescription) {
                    if (!jobLink.includes("/pagead/")) {
                        fileStream.write(jobObject + ",\n");
                    //wrkDB.insertPosting(wrkDB.pool, JSON.parse(jobObject));
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
