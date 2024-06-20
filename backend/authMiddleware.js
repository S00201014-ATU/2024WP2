const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let  token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({error: 'Not authorised, no token'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({error: 'Not authorised, token failed'});
    }
};

module.exports = { protect }