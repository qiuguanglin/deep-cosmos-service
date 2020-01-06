'use strict';

const router = require('express').Router();
const {flightsMap, planetList} = require('../lib/GraphReader');

router.get('/flights', (req, res) => {
  const flightsMapSerielizedObj = {};
  flightsMap.forEach((value, key) => flightsMapSerielizedObj[key] = value);

  const message = {
    flightsMap: flightsMapSerielizedObj,
    planetList
  }
  res.send({success: true, message});
});

module.exports = router;
