const conn = require('../../config/database')

module.exports.getAllUsers= function(req, res) {
    conn.query("SELECT * FROM users", function(err, result) {
        if(err) throw err;
        res.json({
            status:true,
            data:result,
            message:'get all users sucessfully'
        })
    })
}

module.exports.findUser = function(req,res) {
    const id = req.params.id
    conn.query("SELECT * FROM users WHERE id=?", [id], function(err, result) {
        if(err) throw err;
        res.json({
            status:true,
            data: result,
            message:'get data with ID successfully'
        })
    });
}

module.exports.updateUser = function(req,res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const updated_at = new Date()

    const id = req.params.id

    const sql_query = "UPDATE users SET name=?, email=?, password=?, updated_at=? WHERE id=?"
    conn.query(sql_query, [name, email, password, updated_at, id],
        function(err, result) {
            if(err) throw err;
            res.json({
                status:200,
                data: result,
                message:'update successfully'
            })
        }
    )
}

module.exports.deleteUser = function(req,res) {
    const id = req.params.id
    conn.query("DELETE FROM users WHERE id=?", [id], function(err, result) {
        if(err) throw err;
        res.json({
            status:200,
            message:'delete successfully'
        })
    });
}