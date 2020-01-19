'use strict';

const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

module.exports = env => {
  if(env === 'prd') {
    const stream = fs.createWriteStream(path.join(__dirname, '../deepcosmos-access.log'), { flags: 'a' });
    return morgan('common', {stream});
  }

  return morgan('dev');
}
