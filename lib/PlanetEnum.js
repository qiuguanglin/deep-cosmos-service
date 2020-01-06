'use strict';

const {planetList} = require('./GraphReader');
module.exports = planetList.reduce((obj, ele) => {obj[ele.name] = ele; return obj}, {});
