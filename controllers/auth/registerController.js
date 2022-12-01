const conn = require('../../config/database');
module.exports.register = function(req, res) {
    const today = new Date();
    const users = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "created_at": today,
        "updated_at": today
    }

    conn.query("INSERT INTO users SET ?", users, function(err, results, fields) {
        if(err) {
            res.status(401).json({
                message:"there are some errror with query"
            })
            
        } else {
            // res.json({
            //     status:201,
            //     data:users,
            //     message:'user registered sucessfully'
            // })
            res.status(201).json({
                data:users,
                message:'user registered sucessfully'
            })
        }
    })
}