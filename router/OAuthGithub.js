'use strict';

module.exports = config => {
  const router = require('express').Router();
  const axios = require('axios');
  const Logger = require('../Logger')('OAuthGithubService');
  const {clientID: CLIENT_ID, clientSecret: CLIENT_SECRET} = config.oauth.github;
  const TOKEN_URL = 'https://github.com/login/oauth/access_token';
  const API_URL = 'https://api.github.com/user';
  const AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';

  router.get('/oauth/github', (req, res) => {
    Logger.info('oauth2 login redirection');
    if(!req.session.origin)
      req.session.origin = req.get('origin');

    const githubAuthUrl = `${AUTHORIZE_URL}?client_id=${CLIENT_ID}`;
    res.end(githubAuthUrl);
  });

  router.get('/oauth/redirect', (req, res) => {
    const {code} = req.query;
    _fetchAccessToken(code, req, res);
  });

  function _fetchAccessToken(code, req, res){
    Logger.info('OAuth callback and fetching access token');
    axios({
      url: TOKEN_URL,
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
      url: API_URL,
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

  return router;
}



// module.exports = router;
