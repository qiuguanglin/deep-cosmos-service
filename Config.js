'use strict';

module.exports = {
  oauth: {
    clientID: '272b679df0ac55f5ade8',
    clientSecret: 'f3ee1f979a6448d7d82131e1ad62ec612fa0ed37'
  },
  dev: {
    App: {
      port: 60000
    },
    Redis: {
      host: '120.77.17.197',
      port: 6379
    },
    Cors: {
      host: 'http://localhost',
      port: 8080,
      get asURL() {return this.host + ':' + this.port}
    },
    DB: {
      name: 'db.deepcosmos'
    }
  },
  prd: {
    App: {
      port: 60000
    },
    Redis: {
      host: 'localhost',
      port: 6379
    },
    Cors: {
      host: 'http://120.77.17.197',
      get asURL() {return this.host}
    },
    DB: {
      name: 'db.deepcosmos'
    }
  }
}
