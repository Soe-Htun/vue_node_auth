const conn = require('../../config/database')

module.exports.login= function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    conn.query("SELECT * FROM users WHERE email = ?", [email], function(err, results, fields) {
        if (err) {
            res.json({
              status:false,
              message:'there are some error with query'
              })
        }else{
          if(results.length >0){
              if(password==results[0].password){
                  res.json({
                      status:true,
                      message:'login successfully'
                  })
              }else{
                  res.json({
                    status:false,
                    message:"Incorrect password"
                   });
              }
          }
          else{
            res.json({
                status:false,	
                message:"Email does not exits"
            });
          }
        }
    })
}