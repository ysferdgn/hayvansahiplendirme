// middlewares/verifyToken.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader);

    if (!authHeader) {
      console.log('No auth header found');
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    if (!token) {
      console.log('No token found in header');
      return res.status(401).json({ message: 'No token provided' });
    }

    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    console.log('User ID from token:', decoded.id);

    if (!decoded.id) {
      console.log('No user ID in token');
      return res.status(401).json({ message: 'Invalid token format' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    console.error('Error details:', err.message);
    console.error('Error stack:', err.stack);
    return res.status(401).json({ 
      message: 'Invalid token',
      error: err.message 
    });
  }
};
