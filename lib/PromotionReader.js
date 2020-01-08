'use strict';

const path = require('path');
const fs = require('fs');
const BASE_PATH = process.cwd();

const PROMOTION_DATA = '../data/promotion.json'

module.exports = JSON.parse(fs.readFileSync(path.join(__dirname, PROMOTION_DATA)));
