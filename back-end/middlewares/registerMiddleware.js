const UserModel = require("../models/userModel");

const registerMiddleware = async (req, res, next) => {
    const { email, pass } = req.body;
  
    if (pass.length < 8) {
      return res.status(400).json({ msg: 'Password must be at least 8 characters long' });
    }
  
    if (!/\d/.test(pass)) {
      return res.status(400).json({ msg: 'Password must contain a number' });
    }
  
    if (!/[!@#$%&]/.test(pass)) {
      return res.status(400).json({ msg: 'Password must contain a special character' });
    }
  
    if (!/[A-Z]/.test(pass)) {
      return res.status(400).json({ msg: 'Password must contain an uppercase character' });
    }
  
    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }
  
    next();
  };

  module.exports = registerMiddleware;