const conn = require('../../config/database')

module.exports.createMeeting = function(req, res) {
    const today = new Date()
    const meetings = {
        "title" : req.body.title,
        "room_id": req.body.room.room_id,
        "room_name": req.body.room.room_name,
        "start_time": req.body.start_time,
        "end_time": req.body.end_time,
        "created_at": today,
        "updated_at": today
    }
    conn.query("INSERT INTO all_meetings SET ?", meetings, function(err, result) {
        if(err) {
            // res.status(402).json({
            //     message: "There are some error with query"
            // })
            res.send(err)
        } else {
            res.json({
                status:201,
                data: meetings,
                message:'create meeting sucessfully'
            })
        }
    })
}