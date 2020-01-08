'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Config = require('./Config');
const RedisClient = require('redis').createClient(Config.Redis);
const RedisStore = require('connect-redis')(session);
const UserRouter = require('./router/User');
const PromotionRouter = require('./router/Promotion');
const SearchRouter = require('./router/Search');
const DataRouter = require('./router/Data');
// const Repo = require('./repo/Repo');

const CORS_OPT = {
  origin: Config.Cors.asURL,
  maxAge: 1200,
  credentials: true
}

const SESSION_OPT = {
  store: new RedisStore({
    client: RedisClient
  }),
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
  .use('/promotion', PromotionRouter)
  .use('/search', SearchRouter)
  .use('/data', DataRouter)
  .listen(60000, console.log('server stated'));
