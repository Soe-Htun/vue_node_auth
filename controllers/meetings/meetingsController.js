const conn = require('../../config/database')

module.exports.createMeeting = function(req, res) {
    const today = new Date()
    const meetings = {
        "title" : req.body.title,
        "room_id": req.body.room.room_id,
        "start_time": req.body.start_time,
        "end_time": req.body.end_time,
        "created_at": today,
        "updated_at": today
    }
    conn.query("INSERT INTO all_meetings SET ?", meetings, function(err, result) {
        if(err) {
            res.status(402).json({
                message: "There are some error with query"
            })
        } else {
            res.json({
                status:201,
                data: meetings,
                message:'create meeting sucessfully'
            })
        }
    })
}

module.exports.getAllMeetings = function(req, res) {
    conn.query("SELECT * FROM all_meetings JOIN meeting_rooms ON all_meetings.room_id = meeting_rooms.id JOIN users ON all_meetings.emp_id = users.emp_id", function(err, result) {
        if(err) {
            res.status(402).json({
                message: "There are some error with query"
            })
        } else {
            
            for(let i=0;i< result.length;i++) {
                var meetings=  {
                    "room": {
                       "id": result[i].room_id,
                       "name": result[i].name,
                       "bu_br_div": result[i].bu_br_div,
                       "status": result[i].status,
                       "location": result[i].location
                    },
                    "id": result[i].id,
                    "emp_id": result[i].emp_id,
                    "start-time": result[i].start_time,
                    "end_time": result[i].end_time,
                    "title": result[i].title,
                }
            }

            res.status(200).json({
                data: meetings,
                message:'get meeting list sucessfully'
            })
        }
    })
}