'use strict';

const md5 = require('md5');
const Repo = require('./Repo');
const INSERT = 'INSERT INTO USER(USERNAME, PASS, NICKNAME)VALUES(?, ?, ?)';
const SELECT_ALL = 'SELECT * FROM USER';
const SELECT = 'SELECT * FROM USER WHERE USERNAME = ?';

const NewUser = ({username, pass, nickname}, callback) => {
  Repo.run(INSERT, [username, md5(pass), nickname], err => {
    if(err)return callback(err);
    callback(null, {username, nickname});
  });
}

const FindUser = (username, callback) => {
    Repo.get(SELECT, [username], (err, row) => {
    if(err)return callback(err);
    callback(null, row);
  });
}

module.exports = {NewUser, FindUser};
