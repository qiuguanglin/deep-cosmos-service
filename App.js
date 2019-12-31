'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const UserRouter = require('./router/User');

const CORS_OPT = {
  origin: 'http://localhost:8080',
  maxAge: 1200,
  credentials: true
}

const SESSION_OPT = {
  key: 'user_sid',
  secret: '-@-3ban5%na*=',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 5 * 60 * 1000
  }
}

const App = express();
App
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .use(cors(CORS_OPT))
  .use(cookieParser())
  .use(session(SESSION_OPT))
  .use('/user', UserRouter)
  .listen(60000, console.log('server stated'));
