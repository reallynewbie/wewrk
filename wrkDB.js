// wrkDB.js: mySQL module for wewrk
const mysql = require('mysql');

/* Inserts a jobObject into the mySql database, printing the insertID if successful
 */
function insertPosting(pool, jobObject) {
	var sql = mysql.format("INSERT INTO postings (title, html, url, location, company) VALUES (?, ?, ?, ?, ?)", [jobObject.title, jobObject.description, jobObject.link, jobObject.location, jobObject.company]);
	    pool.query(sql, function(err, result) {
		if (err) throw err;
		console.log("insertId: " + result.insertId);
	    });
    }

/* Queries the database for job postings matching the provided search criteria.
 * If title, location, or company is passed as a blank string the query will not filter using that criteria.
 * Callback result is an array containing the returned rows
 */
function selectPosting(pool, title, location, company, callback) {

	// Escape search terms if not blank
	if (title != '') title = mysql.escape(title).replace(/'/g, "");
	if (location != '') location = mysql.escape(location).replace(/'/g, "");
	if (company != '') company = mysql.escape(company).replace(/'/g, "");

	// Build query using search terms
	var sql = "SELECT * FROM postings WHERE title LIKE '%" + title +
	 "%' AND location LIKE '%" + location +
	  "%' AND company LIKE '%" + company + "%'"; 

	// Execute query
	pool.query(sql, function(err, result) {
		if (err) return callback(err);
		callback(null, result);
		
	});
	
}

/* Converts the result of a mySQL query into an object
 */
function resultToObject(result) {
	var resultArray = [];
	result.forEach(function(res) {
		let job = {
			jobTitle: res.title,
			companyName: res.company,
			location: res.location,
			link: res.url,
			jobDescription: res.html
		}
		resultArray.push(job);
	});
	return resultArray;
}


module.exports = {
	insertPosting: insertPosting,
	selectPosting: selectPosting,
	resultToObject: resultToObject
};