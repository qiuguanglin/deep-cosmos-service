'use strict';

module.exports = {
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
    },
    oauth: {
      github: {
        clientID: '272b679df0ac55f5ade8',
        clientSecret: 'f3ee1f979a6448d7d82131e1ad62ec612fa0ed37'
      }
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
    },
    oauth: {
      github: {
        clientID: '159744c17f40fafd3023',
        clientSecret: '66ebc88a31e50006fd84322ee7fb1fffd5c5e55a'
      }
    }
  }
}
