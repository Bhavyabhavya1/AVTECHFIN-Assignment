const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

const isAdmin = (req, res, next) => {
    // Check if the user's role is Admin
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ msg: 'Access denied: Not an Admin' });
    }
    next();
};

module.exports = { verifyToken, isAdmin };