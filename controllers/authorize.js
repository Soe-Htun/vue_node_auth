const jwt = require('jsonwebtoken');
module.exports.isAuthorized = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token){
            res.json({
                status: 403,
                message: 'Unauthorized'
            })
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.json({
            status: 400,
            message: 'Invalid token'
        })
    }
}