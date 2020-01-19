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
