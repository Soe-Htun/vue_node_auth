const conn = require('../../config/database')

module.exports.createUser = function(req, res) {
    const today = new Date();
    const users = {
        "emp_id": req.body.emp_id,
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
            res.status(201).json({
                data:users,
                message:'create user sucessfully'
            })
        }
    })
}


module.exports.getAllUsers= function(req, res) {
    conn.query("SELECT * FROM users", function(err, result) {
        if(err){
            res.status(401).json({
                message: 'Something went wrong'
            })
        } else {
            res.json({
                status:true,
                data:result,
                message:'get all users sucessfully'
            })
        }
        
    })
}

module.exports.findUser = function(req,res) {
    const id = req.params.id
    conn.query("SELECT * FROM users WHERE id=?", [id], function(err, result) {
        if(err){
            res.status(401).json({
                message: 'Something went wrong'
            })
        } else {
            res.status(200).json({
                data: result,
                message:'get data with ID successfully'
            })
        }
    });
}

module.exports.updateUser = function(req,res) {
    const emp_id = req.body.emp_id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const updated_at = new Date()

    const id = req.params.id

    const sql_query = "UPDATE users SET emp_id=? name=?, email=?, password=?, updated_at=? WHERE id=?"
    conn.query(sql_query, [emp_id, name, email, password, updated_at, id],
        function(err, result) {
            if(err){
                res.status(401).json({
                    message: 'Something went wrong'
                })
            } else {
                res.json({
                    status:200,
                    data: result,
                    message:'update successfully'
                })
            }
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