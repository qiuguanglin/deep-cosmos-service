'use strict';

const md5 = require('md5');
const router = require('express').Router();
const {FindUser, NewUser, AllUsers} = require('../repo/UserRepo');

router.get('/allUsers', (req, res) => {
  AllUsers((err, rows)=>res.send({success: true, message: rows}));
});

router.post('/newUser', (req, res) => {
  //first chceck session
  const {user_sid} = req.cookies;
  if(user_sid && req.session.user){
    return res.send({success: true, message: 'logged in'});
  }

  const {username, pass, nickname} = req.body;
  NewUser({username, pass, nickname}, (err, user)=>{
    if(err){
      console.log(err); //this happens mostly due to the username has existed
      return res.send({success: false, message: 'creating user error'});
    }

    //create user and stuff into session
    req.session.user = user;
    res.send({success: true, message: row.NICKNAME || row.USERNAME});
  });
});

router.post('/login', (req, res) => {
    const {username, pass} = req.body;
    FindUser(username, (err, row) => {
      if(row){
        if(row.PASS === md5(pass)){
          req.session.user = {username: row.USERNAME, nickname: row.NICKNAME};
          return res.send({success: true, message: row.NICKNAME || row.USERNAME});
        }
      }
      res.send({success: false, message: 'login failed'});
    });
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
