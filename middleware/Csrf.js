'use strict';

const CsrfMiddleware = (req, res) => {
  if(!req.cookies['XSRF-TOKEN'])
    res.cookie('XSRF-TOKEN', req.csrfToken());
  res.end();
}

const CsrfErrHandlerMiddleware = (err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  res.send({success: false, message: err.code});
}

module.exports = {CsrfMiddleware, CsrfErrHandlerMiddleware};
