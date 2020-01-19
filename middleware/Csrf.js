'use strict';
const Logger = require('../Logger')('CSRF-Middleware')

const CsrfMiddleware = (req, res) => {
  if(!req.cookies['XSRF-TOKEN'])
    res.cookie('XSRF-TOKEN', req.csrfToken());
  res.end();
}

const CsrfErrHandlerMiddleware = (err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') {
    Logger.warn(err.code);
    next(err);
  }

  Logger.warn('CSRF code invalid');
  res.send({success: false, message: err.code});
}

module.exports = {CsrfMiddleware, CsrfErrHandlerMiddleware};
