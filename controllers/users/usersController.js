const conn = require('../../config/database')

module.exports.users= function(req, res) {
    conn.query("SELECT * FROM users", function(err, result) {
        if(err) throw err;
        res.json({
            status:true,
            data:result,
            message:'get all users sucessfully'
        })
    })
}