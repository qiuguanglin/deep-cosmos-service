'use strict';

const router = require('express').Router();
const RouteSearchEngine = require('../lib/RouteSearchEngine');
const PlanetEnum = require('../lib/PlanetEnum');

router.get('/flights/:from/:to', (req, res) => {
  let {from, to} = req.params;
  if(from.toLowerCase().trim() === to.toLowerCase().trim()){
    return res.send({success: false, message: 'start and destination cannot be identical'});
  }

  console.log('sarching for', from, to);
  const flights = RouteSearchEngine(from, to);
  res.send({success: true, message: flights});
});

module.exports = router;
