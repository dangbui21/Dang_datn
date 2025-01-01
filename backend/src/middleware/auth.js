const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.userData = { userId: decoded.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Auth failed' });
  }
};

module.exports = auth;