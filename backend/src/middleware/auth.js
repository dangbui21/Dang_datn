const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    console.log('Headers received:', req.headers);
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      console.log('No token provided in request');
      return res.status(401).json({ message: 'No token provided' });
    }

    console.log('Token received:', token);
    const decoded = jwt.verify(token, 'your_jwt_secret');
    console.log('Decoded token:', decoded);
    
    req.userData = { userId: decoded.userId };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Auth failed' });
  }
};

module.exports = auth;