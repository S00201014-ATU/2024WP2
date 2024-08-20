const jwt = require('jsonwebtoken');

// Middleware function to protect routes by checking for a valid token
const protect = (req, res, next) => {
    let token;

    // Check if the authorization header contains a token starting with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Extract the token from the header
        token = req.headers.authorization.split(' ')[1];
    }

    // If no token is found, respond with a 401 error (Not authorized)
    if (!token) {
        return res.status(401).json({ error: 'Not authorised, no token' });
    }

    try {
        // Verify the token using the secret and assign the decoded user information to req.user
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();  // Move to the next middleware or route handler
    } catch (error) {
        // If token verification fails, respond with a 401 error (Not authorised)
        res.status(401).json({ error: 'Not authorised, token failed' });
    }
};

module.exports = { protect };
