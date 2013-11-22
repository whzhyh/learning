var db_helper = exports;
var mysql = require('mysql');
var settings = require('./settings.js');

db_helper.create_connection = function() {
    var connection = mysql.createConnection({
        host: settings.db_host,
        user: settings.db_user,
        database: settings.db_name
    });
    return connection;
}
