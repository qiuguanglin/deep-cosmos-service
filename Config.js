'use strict';

module.exports = {
  Redis: {
    host: '49.235.159.64',
    port: 6379
  },
  Cors: {
    host: 'http://localhost',
    port: 8080,
    get asURL() {return this.host + ':' + this.port}
  }
}
