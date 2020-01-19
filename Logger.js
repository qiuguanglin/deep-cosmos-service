'use strict';

const log4js = require('log4js');

module.exports = service => {
  log4js.configure({
    appenders: { 'deepcosmos': { type: 'file', filename: 'deepcosmos-general.log' } },
    categories: { default: { appenders: ['deepcosmos'], level: 'info' } }
  });
  return log4js.getLogger(service);
}
