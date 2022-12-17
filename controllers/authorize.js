const jwt = require('jsonwebtoken');
module.exports.isAuthorized = function(req, res, next) {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(' ')[1];
        if (!token){
            res.status(401).json({
                message: 'invalid: no toke provided'
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET, function(err, user) {
            if(err) return res.status(403).json({ message: "invalid token" });

            if(user) {
                res.locals.user = user;
                next();
            }
        });
        // req.user = decoded;
        // next();
    } catch (error) {
        res.status(401).json({
            message: 'Invalid Token'
        })
    }
}