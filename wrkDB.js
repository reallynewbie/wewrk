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
	database: "wewrk",
	multipleStatements: true
    });

/* Gets the current date, formatted as yyyy/mm/dd
 */
function getDate(){
	var date = new Date();
	y = date.getFullYear();
	m = date.getMonth() + 1;
	d = date.getDate() - 1;
	date = y + '-' + m + '-' + d;
	return date;
}

function checkExists(pool, word, callback) {
	word = mysql.escape(word).replace(/'/g, "");
	var sql = "SELECT posting_id FROM postings WHERE location LIKE '%" + word + "%' LIMIT 1"
	pool.query(sql, function(err, result) {
		if (err) return callback(err);
		callback(null, result.length);
	});
}

function findLocation(pool, words, callback) {
	console.log("Words: " + words);
	var sql = '';
	words.forEach(function(value, i) {
		sql += "SELECT posting_id FROM postings WHERE location LIKE '%" + value + "%' LIMIT 1;"
		console.log(i + value);
	});
	pool.query(sql, function(err, result) {
		if (err) return callback(err);
		var terms = [];
		var location;
		result.forEach(function(value, i) {
			console.log("Value: " + value + "Length: " + value.length);
			if (value.length == 0) {
				console.log("false" + i + value);
				terms.push(words[i]);
			}
			else if (value.length == 1) {
				console.log("true" + i + value);
				location = words[i];
			}
		});
		callback(null, terms, location);
	})
	console.log(sql);
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


function selectPostingAdvanced(pool, terms, location, pay, type, experience, sort, offset, callback) {

	// Escape search terms if not blank
	if (location != '') location = mysql.escape(location).replace(/'/g, "");
	if (pay != '') pay = mysql.escape(pay).replace(/'/g, "");
	if (type != '') type = mysql.escape(type).replace(/'/g, "");
	if (experience != '') experience = mysql.escape(experience).replace(/'/g, "");
	if (sort === 'relevance') sort = "";
	if (sort === 'date') sort = ", date"
	terms = terms.join(" ")
	console.log(terms);
	console.log("Location: "+location);
	var locOrder = (location == '') ? '>=' : '>';
	var titleOrder = (terms == '') ? '>=' : '>';

	// Build query using search terms
	var select = `SELECT * FROM
	(
		SELECT *,
		MATCH(title) AGAINST('${terms}') as relTitle,
		MATCH(location) AGAINST('${location}') as relLocation,
		MATCH(company) AGAINST('${terms}') as relCompany
		FROM postings
		where
			MATCH(title, location, company)
			AGAINST('${terms} ${location}')
		ORDER BY relTitle*1 + relLocation*1 + relCompany*1${sort} DESC
	) as t 
	where relTitle ${titleOrder} 0 and relLocation ${locOrder} 0 and relCompany >= 0
	and jobType like '%${type}%'
	and experienceLevel like '%${experience}%'
	limit ${offset}, 10;`

	var total = `SELECT Count(*) AS total FROM
	(
		SELECT *,
		MATCH(title) AGAINST('${terms}') as relTitle,
		MATCH(location) AGAINST('${location}') as relLocation,
		MATCH(company) AGAINST('${terms}') as relCompany
		FROM postings
		where
			MATCH(title, location, company)
			AGAINST('${terms} ${location}')
		ORDER BY relTitle*1 + relLocation*1 + relCompany*1${sort} DESC
	) as t 
	where relTitle ${titleOrder} 0 and relLocation ${locOrder} 0 and relCompany >= 0
	and jobType like '%${type}%'
	and experienceLevel like '%${experience}%';`
	
	if (terms == '' && location == '') {
		select = 
		`SELECT * FROM postings
		WHERE jobType like '%${type}%'
		and experienceLevel like '%${experience}%'
		ORDER BY date DESC
		LIMIT ${offset}, 10;`
		total = 
		`SELECT COUNT (*) FROM postings
		WHERE jobType like '%${type}%'
		and experienceLevel like '%${experience}%';`
	} 
	console.log(select);

	pool.query(select + total , function(err, result) {
		if (err) return callback(err);
		callback(null, resultToObject(result));
		
	});
	
}

/* Queries the database for job postings matching the provided search criteria.
 * If title, location, or company is passed as a blank string the query will not filter using that criteria.
 * This version requires distinct search fields.
 * Callback result is an array containing the returned rows
 */
function selectPosting(pool, title, location, company, pay, type, experience, sort, offset, callback) {

	// Escape search terms if not blank
	if (title != '') title = mysql.escape(title).replace(/'/g, "");
	if (location != '') location = mysql.escape(location).replace(/'/g, "");
	if (company != '') company = mysql.escape(company).replace(/'/g, "");
	if (pay != '') pay = mysql.escape(pay).replace(/'/g, "");
	if (type != '') type = mysql.escape(type).replace(/'/g, "");
	if (experience != '') experience = mysql.escape(experience).replace(/'/g, "");
	if (sort === 'relevance') sort = "relTitle*1 + relLocation*1 + relCompany*1";

	// Build query using search terms
	var select = "SELECT * FROM postings WHERE title LIKE '%" + title +
	 "%' AND location LIKE '%" + location +
	 "%' AND company LIKE '%" + company +
	 "%' AND pay >= " + pay +
	 " AND jobType LIKE '%" + type +
	 "%' AND experienceLevel LIKE '%" + experience +
	 "%' ORDER BY " + sort +
	 " DESC LIMIT " + offset + ", 10;"; 
	
	// Count total results before limit
	var total = "SELECT COUNT(*) AS total FROM postings WHERE title LIKE '%" + title +
	"%' AND location LIKE '%" + location +
	"%' AND company LIKE '%" + company +
	"%' AND pay >= " + pay +
	" AND jobType LIKE '%" + type +
	"%' AND experienceLevel LIKE '%" + experience +
	"%';";

	// Count jobs excluded due to missing attributes
	var exType = "SELECT COUNT(*) AS exType FROM postings WHERE title LIKE '%" + title +
	"%' AND location LIKE '%" + location +
	"%' AND company LIKE '%" + company +
	"%' AND pay >= " + pay +
	" AND jobType LIKE '" +
	"' AND experienceLevel LIKE '%" + experience +
	"%';";
	var exPay = "SELECT COUNT(*) AS exPay FROM postings WHERE title LIKE '%" + title +
	"%' AND location LIKE '%" + location +
	"%' AND company LIKE '%" + company +
	"%' AND pay LIKE '" +
	"' AND jobType LIKE '%" + type +
	"%' AND experienceLevel LIKE '%" + experience +
	"%';";
	var exExperience = "SELECT COUNT(*) AS exExperience FROM postings WHERE title LIKE '%" + title +
	"%' AND location LIKE '%" + location +
	"%' AND company LIKE '%" + company +
	"%' AND pay >= " + pay +
	" AND jobType LIKE '%" + type +
	"%' AND experienceLevel LIKE '" +
	"';";

	// Execute 5 queries, result of query n = result[n]
	pool.query(select + total + exType + exPay + exExperience, function(err, result) {
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
	var resultArray = [];
	result[0].forEach(function(res) {
		let job = {
			jobID: res.posting_id,
			jobTitle: res.title,
			companyName: res.company,
			location: res.location,
			experienceLevel: res.experienceLevel,
			jobType: res.jobType,
			pay: res.pay,
			postedDate: res.date.toString(),
			jobDescription: res.html,
			link: res.url
		}
		resultArray.push(job);
	});
	var resultObject = {
		results: resultArray,
		totalResults: result[1][0].total
		//excludedType: result[2][0].exType,
		//excludedPay: result[3][0].exPay,
		//excludedExperience: result[4][0].exExperience
	}
	//console.log(resultObject);
	return resultObject;
}


module.exports = {
	insertPosting,
	selectPosting,
	resultToObject,
	getDate,
	checkExists,
	findLocation,
	selectPostingAdvanced,
	pool
};