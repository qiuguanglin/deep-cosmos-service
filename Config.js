'use strict';

module.exports = {
  dev: {
    Redis: {
      host: '49.235.159.64',
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
      host: 'http://49.235.159.64',
      port: 80,
      get asURL() {return this.host + ':' + this.port}
    },
    DB: {
      name: 'db.deepcosmos'
    }
  }
}
