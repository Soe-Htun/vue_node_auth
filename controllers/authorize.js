const jwt = require('jsonwebtoken');
module.exports.isAuthorized = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token){
            res.status(401).json({
                message: 'Unauthorized'
            })
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Invalid Token'
        })
    }
}