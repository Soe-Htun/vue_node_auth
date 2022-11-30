const conn = require('../../config/database')
module.exports.getRooms = function(req, res) {
    conn.query("SELECT * FROM meeting_rooms", function(err, result) {
        if(err) throw err;
        res.json({
            status: 200,
            data: result,
            message: 'Get room list successfully'
        })
    })
}

module.exports.createRoom = function(req, res) {
    const today = new Date()
    const rooms = {
        "name" : req.body.name,
        "bu_br_div": req.body.bu_br_div,
        "location": req.body.location,
        "status": req.body.status,
        "created_at": today,
        "updated_at": today
    }
    conn.query("INSERT INTO meeting_rooms SET ?", rooms, function(err, result) {
        if(err) {
            res.json({
                status: false,
                message: 'there are some errror with query'
            })
        } else {
            res.json({
                status:201,
                data: rooms,
                message:'user registered sucessfully'
            })
        }
    })
}

module.exports.updateRoom = function(req, res) {
    const id = req.params.id;
    const name = req.body.name;
    const bu_br_div = req.body.bu_br_div;
    const location = req.body.location;
    const status = req.body.status
    const updated_at = new Date()

    const mysql_query = "UPDATE meeting_rooms SET name=?, bu_br_div=?, location=?, status=?, updated_at=? WHERE id=?"
    conn.query(mysql_query, [name, bu_br_div, location, status, updated_at, id], 
        function(err, result) {
            if(err) throw err;
            res.json({
                status: 200,
                data: result,
                message: 'Update success'
            })
        }
    )
}