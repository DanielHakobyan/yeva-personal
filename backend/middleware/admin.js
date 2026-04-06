const User = require('../models/User');

module.exports = async function admin(req, res, next) {
  try {
    // Oldest user in DB is treated as the owner/admin account.
    const owner = await User.findOne().sort({ createdAt: 1 }).select('_id');
    if (!owner) {
      return res.status(403).json({ msg: 'No admin account configured' });
    }

    if (String(req.user.id) !== String(owner._id)) {
      return res.status(403).json({ msg: 'Admin access required' });
    }

    return next();
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};
