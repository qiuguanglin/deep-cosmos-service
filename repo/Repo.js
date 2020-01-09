'use strict';

const sqlite = require('sqlite3').verbose();
const path = require('path');
const DATABASE = require('../Config').dev.DB.name;
const CREATE_TABLE_STM =
`
CREATE TABLE USER(
   ID INTEGER PRIMARY KEY AUTOINCREMENT,
   USERNAME           TEXT    NOT NULL UNIQUE,
   PASS           TEXT    NOT NULL,
   NICKNAME           TEXT
)
`
const db = new sqlite.Database(path.join(__dirname, `../${DATABASE}`), err => {
  if(err)throw err;
  db.run(CREATE_TABLE_STM, err =>  {
    if(err){
      if(err.errno !== 1)console.log(err);
    }
  });
});

module.exports = db;
