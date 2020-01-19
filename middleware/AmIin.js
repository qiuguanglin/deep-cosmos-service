'use strict';

module.exports = (req, res) => {
  const user = req.session.user;
  res.send({success: !!user, message: user});
}
