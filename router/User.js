'use strict';

const router = require('express').Router();

router.post('/newUser', (req, res) => {
  const {user_sid} = req.cookies;
  if(user_sid && req.session.user){
    return res.send({success: true, message: 'logged in'});
  }

  const {username, password} = req.body;
  req.session.user = {username, password};
  res.send({success: true, message: 'account created'});

  // res.send({success: false, message: '用户名已经存在'});
});

router.get('/amIin', (req, res) => {
  res.send({success: !!req.session.user});
});

router.delete('/signout', (req, res) => {
  if(req.session.user){
    res.clearCookie('user_sid');
    res.send({success: true, message: 'signed out'});
  }
});

module.exports = router;
