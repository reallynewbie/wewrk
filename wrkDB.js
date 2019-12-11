// wrkDB.js: mySQL module for wewrk
const mysql = require('mysql');




/* Gets yesterday's date, formatted as yyyy/mm/dd
 * Used when inserting jobs into the database
 */
function getDate(){
	var date = new Date();
	y = date.getFullYear();
	m = date.getMonth() + 1;
	d = date.getDate() - 1;
	date = y + '-' + m + '-' + d;
	return date;
}

/* Given an array of words from a user search, check if any match a location in the database and separate them
 * Returns an array with all non location terms and a string the search location
 */
function findLocation(pool, words, callback) {
	console.log("Words: " + words);
	var sql = '';

	// build a query for each search term against the location column, only looking for a single match
	words.forEach(function(value, i) {
		sql += "SELECT posting_id FROM postings WHERE location LIKE '%" + value + "%' LIMIT 1;"
	});
	pool.query(sql, function(err, result) {
		if (err) return callback(err);
		var terms = [];
		var location;
		// for each word, check if any rows were returned matching the term to a location
		result.forEach(function(value, i) {
			if (value.length == 0) {// no match, not a location, push to terms
				terms.push(words[i]);
			}
			else if (value.length == 1) {// 1 match, is a location, set location
				location = words[i];
			}
		});
		callback(null, terms, location);
	})
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

/* Constructs and executes sql queries based on the provided search criteria
 * Returns a formatted object containing a page(10 jobs) of results
 */
function selectPostingAdvanced(pool, terms, location, pay, type, experience, sort, offset, callback) {

	// Escape search terms if not blank
	if (location != '') location = mysql.escape(location).replace(/'/g, "");
	if (pay != '') pay = mysql.escape(pay).replace(/'/g, "");
	if (type != '') type = mysql.escape(type).replace(/'/g, "");
	if (experience != '') experience = mysql.escape(experience).replace(/'/g, "");
	// define sort method
	if (sort === 'relevance') sort = "";
	if (sort === 'date') sort = ", date"
	// place non location search terms in space delimited string
	terms = terms.join(" ");

	/* Relevance sorting is done using mysql's full text indexing and natural language processing mode of MATCH/AGINST
	 * Weighted scores are generated based on matching search terms to the location, title, and company columns
	 * A score higher than 0 indicates at least one match, with higher scores being more relevant
	 */
	// for relevance sorting, if a location is defined results must have a location match (relLocation > 0)
	var locOrder = (location == '') ? '>=' : '>';
	// for relevance sorting, if non location terms are defined title must have a match (relTitle > 0)
	var titleOrder = (terms == '') ? '>=' : '>';

	// Build query using search terms
	// This query is used for non-empty searches where the user has entered something, and returns up to 10 jobs from the current page
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
	where relTitle ${titleOrder} 0 AND relLocation ${locOrder} 0 AND relCompany >= 0
	AND jobType LIKE '%${type}%'
	AND experienceLevel LIKE '%${experience}%'
	AND sortPay >= ${pay}
	limit ${offset}, 10;`

	// This query gathers the total number of jobs matching a non-empty search
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
	) as t 
	where relTitle ${titleOrder} 0 AND relLocation ${locOrder} 0 AND relCompany >= 0
	AND jobType LIKE '%${type}%'
	AND experienceLevel LIKE '%${experience}%'
	AND sortPay >= ${pay};`
	
	// These alternate queries are used when the search bar is empty as the full text search is not needed
	if (terms == '' && location == '') {
		select = 
		`SELECT * FROM postings
		WHERE jobType LIKE '%${type}%'
		AND experienceLevel LIKE '%${experience}%'
		AND sortPay >= ${pay}
		ORDER BY date DESC
		LIMIT ${offset}, 10;`
		total = 
		`SELECT COUNT (*) AS total FROM postings
		WHERE jobType LIKE '%${type}%'
		AND experienceLevel LIKE '%${experience}%'
		AND sortPay >= ${pay};`
	} 

	// Execute both queries
	pool.query(select + total , function(err, result) {
		if (err) return callback(err);
		callback(null, resultToObject(result));
	});
}

/* Converts the result of a mySQL SELECT query into an object to be passed to the frontend
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
	// final object contains an array of all selected jobs and the number of jobs selected
	var resultObject = {
		results: resultArray,
		totalResults: result[1][0].total
	}
	//console.log(resultObject);
	return resultObject;
}


module.exports = {
	insertPosting,
	selectPosting,
	resultToObject,
	getDate,
	findLocation,
	selectPostingAdvanced,
};