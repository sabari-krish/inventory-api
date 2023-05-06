const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) throw new Error('invalid token');
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
