const conn = require('../../config/database')

module.exports.createMeeting = function(req, res) {
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