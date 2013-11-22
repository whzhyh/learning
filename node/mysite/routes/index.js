/*
 * GET home page.
 */

exports.index = function(req, res) {
    var mysql = require('mysql');
    var settings = require('../settings.js')
    var connection = mysql.createConnection({
        host: settings.db_host,
        user: settings.db_user,
        database: settings.db_name
    });

    connection.connect();

    connection.query('CALL get_errors("26981JUU", "","","", "2013-09-01","2013-09-30", 2, 3)', function(err, rows, fields) {
        if (err) throw err;
        res.json(rows[0]);
        console.log('The solution is: ', rows[0]);
    });

    connection.end();
    // res.render('index', {
    //     title: 'Express'
    // });
};
