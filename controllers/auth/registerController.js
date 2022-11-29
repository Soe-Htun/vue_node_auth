const conn = require('../../config/database');
const jwt = require('jsonwebtoken')
module.exports.register = function(req, res) {
    const today = new Date();
    const users = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "created_at": today,
        "updated_at": today
    }
    // const token = jwt.sign(
    //     process.env.TOKEN_SECRET
    // )
    // users.token=token

    conn.query("INSERT INTO users SET ?", users, function(err, results, fields) {
        if(err) {
            res.json({
                status: false,
                message: 'there are some errror with query'
            })
        } else {
            res.json({
                status:true,
                data:users,
                message:'user registered sucessfully'
            })
        }
    })
}