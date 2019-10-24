const fs = require("fs");
let Crawler = require("crawler");

const location = "Edmonton%2C+AB"
const jobTitle = "developer"
const qualificationsRegEx = new RegExp("Qualifications|What are we looking for|What You Bring to the Role|Requirements.*?<ul>(.*?)<\/ul>", "g");
// const qualificationsRegEx = new RegExp("Qualifications.*?<ul>(.*?)<\/ul>", "g");
//<b>(Qualifications|What are we looking for|What You Bring to the Role|Requirements|Must Haves|Experience)(.*?)<b>

const curDate = new Date();
const fileStream = fs.createWriteStream("./logs/jobs_" + curDate.toTimeString().slice(0, 8) + ".txt");

let c = new Crawler({
    maxConnections: 10,
});

c.queue([{
    uri: 'https://ca.indeed.com/jobs?q=' + encodeURI(jobTitle) + '&l=' + location + '&filter=0&start=0',
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
        let totalJobs = RegExp("(\\d*) jobs").exec(jobCount.trim());
        
        // Uncomment the below line to pull all and comment out the for loop below that.  
        // for (let index = 0; index < totalJobs[1]; index = index + 10) {
        for (let index = 0; index < 10; index = index + 10) { // Pulls 10 
            pullJobDetails(`https://ca.indeed.com/jobs?q=${jobTitle}&l=${location}&filter=0&start=${index}`)
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
                let jobObject = JSON.stringify({
                    title: jobTitle,
                    link: jobLink,
                    description: jobDescription,
                    regex: qualificationsRegEx.test(jobDescription)
                });
                fileStream.write(jobObject + ",\n");

                // if (!qualificationsRegEx.test(jobDescription)) {
                //     let jobObject = jobDescription;
                //     fileStream.write(jobObject + "\n-------------------------\n");
                // }

                //console.log(qualificationsRegEx.test(jobDescription));            
            }
            done();
        }
    }]);
}
