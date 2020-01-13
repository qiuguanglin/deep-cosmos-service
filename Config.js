'use strict';

module.exports = {
  dev: {
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
