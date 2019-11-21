// wrkDB.js: mySQL module for wewrk
const mysql = require('mysql');

function insertPosting(pool, jobObject) {
	var sql = mysql.format("INSERT INTO postings (title, html, url) VALUES (?, ?, ?)", [jobObject.title, jobObject.description, jobObject.link]);
	    pool.query(sql, function(err, result) {
		if (err) throw err;
		console.log("insertId: " + result.insertId);
	    });
    }

/* Selects job postings with titles that include given keyword, or all postings if no keyword given 
 */
function selectPosting(pool, title, callback) {
	if (title == '') {
		var sql =  "SELECT * FROM postings";
		pool.query(sql, function(err, result) {
			if (err) return callback(err);
			callback(null, result);
		});
	}
	var sql = "SELECT * FROM postings WHERE title LIKE '%" + mysql.escape(title) + "%'"; 
	pool.query(sql, function(err, result) {
		if (err) return callback(err);
		callback(null, result);
	});
}

module.exports = {
	insertPosting: insertPosting,
	selectPosting: selectPosting
};