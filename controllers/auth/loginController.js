const conn = require('../../config/database')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

module.exports.loginValidation = Joi.object().keys({
  email: Joi.string().email().required().messages({"string.email": "Enter valid email", "string.empty": "Email is required"}),
  password: Joi.string().min(6).required().messages({"string.min": "Password must be at least 6 characters", "string.empty": 'Password is required' })
})
module.exports.login= function(req, res) {
    const token = jwt.sign({email: req.body.email},
        process.env.TOKEN_SECRET
    )
    const email = req.body.email;
    const password = req.body.password;

    // const auth = (req, res, next) => {
    //   const authHeader = req.headers["authorization"];
    //   const token = authHeader && authHeader.split(" ")[1];
    //   if(!token)
    //     return res.status(401).json({ "msg": "invalid: no token provided " });

    //   jwt.verify(token, )
    // }

    conn.query("SELECT * FROM users WHERE email = ?", [email], function(err, results, fields) {
        if (err) {
            res.json({
              status:false,
              message:'there are some error with query'
              })
        }else{
          if(results.length >0){
              if(password==results[0].password){
                
                const userList = {
                   "userInfo": results[0],
                   "token": token
                }
                  res.json({
                      status:200,
                      data: userList,
                      message:'login successfully'
                  })
              }else{
                   res.status(401).json({
                    message:"Incorrect password"
                  })
              }
          }
          else{
            res.status(401).json({
              message:"Email does not exits"
            })
          }
        }
    })
}