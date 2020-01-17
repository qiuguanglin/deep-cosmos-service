'use strict';

const md5 = require('md5');
const router = require('express').Router();
const {FindUser, NewUser, AllUsers} = require('../repo/UserRepo');

router.post('/newUser', (req, res) => {
  //first check session
  const {user_sid} = req.cookies;
  if(user_sid && req.session.user){
    const sessionUser = req.session.user;
    return res.send({success: true, message: sessionUser});
  }

  const {username, pass, nickname} = req.body;
  NewUser({username, pass, nickname}, (err, user)=>{
    if(err)
      return res.send({success: false, message: err.errno});

    //create user and stuff into session
    req.session.user = user;
    res.send({success: true, message: user});
  });
});

router.post('/login', (req, res) => {
    const {username, pass} = req.body;
    FindUser(username, (err, row) => {
      if(row){
        if(row.PASS === md5(pass)){
          req.session.user = {username: row.USERNAME, nickname: row.NICKNAME};
          return res.send({success: true, message: req.session.user});
        }
      }
      res.send({success: false});
    });
});

router.get('/amIin', (req, res) => {
  const user = req.session.user;
  res.send({success: !!user, message: user});
});

router.get('/signout', (req, res) => {
  if(req.session.user){
    res.clearCookie('user_sid');
    res.send({success: true});
  }
});

module.exports = router;
