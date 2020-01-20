'use strict';

const md5 = require('md5');
const router = require('express').Router();
const {FindUser, NewUser, AllUsers} = require('../repo/UserRepo');
const Logger = require('../Logger')('UserService')

router.post('/newUser', (req, res) => {
  //first check session
  const {user_sid} = req.cookies;
  if(user_sid && req.session.user){
    const sessionUser = req.session.user;
    return res.send({success: true, message: sessionUser});
  }

  const {username, pass, nickname} = req.body;
  NewUser({username, pass, nickname}, (err, user)=>{
    if(err){
      Logger.warn(err);
      return res.send({success: false, message: err.errno});
    }

    //create user and stuff into session
    Logger.info('created new user %s', username);
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

      Logger.info('login failed %s', username);
      res.send({success: false});
    });
});

router.get('/signout', (req, res) => {
  if(req.session.user){
    Logger.info('user signed out %s', req.session.user.username);
    res.clearCookie('user_sid');
    return res.send({success: true});
  }
  res.send({message: false});
});

module.exports = router;
