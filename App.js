'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csurf = require('csurf');
const ENV = process.argv[2];
const Config = require('./Config')[ENV];
const RedisClient = require('redis').createClient(Config.Redis);
const RedisStore = require('connect-redis')(session);
const UserRouter = require('./router/User');
const OAuthRouter = require('./router/OAuth');
const PromotionRouter = require('./router/Promotion');
const SearchRouter = require('./router/Search');
const DataRouter = require('./router/Data');
const {CsrfMiddleware, CsrfErrHandlerMiddleware} = require('./middleware/Csrf');
const MorganMiddleware = require('./middleware/MorganMiddleware')(ENV);
const Logger = require('./Logger')('App');

RedisClient.on('connect', () => Logger.info('redis connected'));
RedisClient.on('error', err=> Logger.warn('redis connected error address %s port %s', err.address, err.port));

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

const csurfMiddleware = csurf({cookie: {httpOnly: true}});
const {port} = Config.App;
const App = express();

App
  .use(MorganMiddleware)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .use(cors(CORS_OPT))
  .use(cookieParser())
  .use(session(SESSION_OPT))
  .get('/user/amIin', require('./middleware/AmIin'))
  .use('/promotion', PromotionRouter)
  .use('/search', SearchRouter)
  .use('/data', DataRouter)
  .use('/user', OAuthRouter)
  .use('/user', csurfMiddleware, UserRouter)
  .get('/csrf', csurfMiddleware, CsrfMiddleware)
  .use(CsrfErrHandlerMiddleware)
  .listen(port, () => Logger.info(`server started at ${port}`));
