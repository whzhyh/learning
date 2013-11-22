var db_helper = require('../db_helper.js');

exports.active_user = function(req, res) {

    var connection = db_helper.create_connection();

    connection.connect();

    connection.query('CALL get_active_user_count("26981JUU", "", "", "", "2013-08-19","2013-9-20")', function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.json({error:"there is an error!!!"});
        } else {
            res.json(rows[0]);
        }
    });
    connection.end();
};

