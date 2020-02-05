'use strict';

const router = require('express').Router();
const axios = require('axios');
const Logger = require('../Logger')('OAuthService');
const {clientID: CLIENT_ID, clientSecret: CLIENT_SECRET} = require('../Config').oauth;
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_API = 'https://api.github.com/user';

router.get('/oauth/github', (req, res) => {
  Logger.info('oauth2 login redirection');
  if(!req.session.origin)
    req.session.origin = req.get('origin');

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;
  res.end(githubAuthUrl);
});

router.get('/oauth/redirect', (req, res) => {
  const {code} = req.query;
  _fetchAccessToken(code, req, res);
});

function _fetchAccessToken(code, req, res){
  Logger.info('OAuth callback and fetching access token');
  axios({
    url: GITHUB_TOKEN_URL,
    method: 'post',
    params: {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    },
    headers: {
      accept: 'application/json'
    }
  })
  .then(response => {
    const {access_token: accessToken, scope} = response.data;
    _fetch3rdPartyUserInfo(null, accessToken, req, res);
  })
  .catch(error => {
    Logger.warn('failed to get access tokekn from 3rd party');
    return res.redirect(req.session.origin);
  });
}

function _fetch3rdPartyUserInfo(error, accessToken, req, res){
  axios({
    url: GITHUB_API,
    headers: {
      Authorization: `token ${accessToken}`
    }
  }).then(infoResponse => {
    const {name, login} = infoResponse.data;
    const username = name || loginName;
    req.session.user = {username} ;
    Logger.info('loggin with 3rd party authentication successfully', username);
    res.redirect(req.session.origin);
  }).catch(error => {
    Logger.warn('failed to authorize by 3rd party');
    res.redirect(req.session.origin);
  });
}

module.exports = router;
