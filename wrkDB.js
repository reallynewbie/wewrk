// wrkDB.js: mySQL module for wewrk
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

// Change connection info based on your mySQL setup
var pool = mysql.createPool({
	connectionLimit: 20,
	host: "localhost",
	user: "root",
	password: process.env.PASSWORD,
	database: "wewrk"
    });

/* Gets the current date, formatted as yyyy/mm/dd
 */
function getDate(){
	var date = new Date();
	y = date.getFullYear();
	m = date.getMonth() + 1;
	d = date.getDate() -1;
	date = y + '-' + m + '-' + d;
	return date;
}

/* Inserts a jobObject into the mySql database, printing the insertID if successful
 */
function insertPosting(pool, jobObject) {
	var sql = mysql.format("INSERT INTO postings (title, html, url, location, company, date, pay, jobType) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
	 [jobObject.title, jobObject.description, jobObject.link, jobObject.location, jobObject.company, getDate(), jobObject.pay, jobObject.jobType]);
	    pool.query(sql, function(err, result) {
		if (err) {
			// Handle insertion of duplicate url
			if (err.code == 'ER_DUP_ENTRY') {
				return;
			}
			// Handle other mySQL errors
			else throw err;
		}
		console.log("insertId: " + result.insertId);
	    });
    }

/* Queries the database for job postings matching the provided search criteria.
 * If title, location, or company is passed as a blank string the query will not filter using that criteria.
 * This version requires distinct search fields.
 * Callback result is an array containing the returned rows
 */
function selectPosting(pool, title, location, company, pay, type, experience, offset, callback) {

	// Escape search terms if not blank
	if (title != '') title = mysql.escape(title).replace(/'/g, "");
	if (location != '') location = mysql.escape(location).replace(/'/g, "");
	if (company != '') company = mysql.escape(company).replace(/'/g, "");
	if (pay != '') pay = mysql.escape(pay).replace(/'/g, "");
	if (type != '') type = mysql.escape(type).replace(/'/g, "");
	if (experience != '') experience = mysql.escape(experience).replace(/'/g, "");

	// Build query using search terms
	var sql = "SELECT * FROM postings WHERE title LIKE '%" + title +
	 "%' AND location LIKE '%" + location +
	 "%' AND company LIKE '%" + company +
	 "%' AND pay >= " + pay +
	 " AND jobType LIKE '%" + type +
	 "%' AND experienceLevel LIKE '%" + experience +
	 "%' LIMIT " + offset + ", 10"; 

	// Execute query
	pool.query(sql, function(err, result) {
		if (err) return callback(err);
		callback(null, resultToObject(result));
		
	});
	
}

/*
{
      jobID: 1234, (some ID number to be able to identify the job posting)
      jobTitle: "Frontend web application developer",
      companyName: "Test Company",
      location: "Edmonton, AB",
      entryLevel: "Junior Entry Level",
      jobType: "Full Time",
      salary: "$27.75/hr",
      postedDate: "10/29/2019",
      closingDate: "11/30/2019",
      jobDescription: "HTML HERE",
      applicationLink: "Insert link to the apply button here"
}
 */

/* Converts the result of a mySQL query into an object
 */
function resultToObject(result) {
	console.log(result);
	var resultArray = [];
	result.forEach(function(res) {
		let job = {
			jobID: res.posting_id,
			jobTitle: res.title,
			companyName: res.company,
			location: res.location,
			experienceLevel: res.experienceLevel,
			jobType: res.jobType,
			pay: res.pay,
			postedDate: res.date,
			jobDescription: res.html,
			link: res.url
		}
		resultArray.push(job);
	});
	return resultArray;
}


module.exports = {
	insertPosting,
	selectPosting,
	resultToObject,
	getDate,
	pool
};