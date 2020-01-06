'use strict';

const router = require('express').Router();
const RouteSearchEngine = require('../lib/RouteSearchEngine');
const PlanetEnum = require('../lib/PlanetEnum');

router.get('/flights/:from/:to', (req, res) => {
  let {from, to} = req.params;
  const [planetFrom, planetTo] = [PlanetEnum[from], PlanetEnum[to]];
  if(!planetFrom || !planetTo)
    res.send({success: false, flights: 'no results found'});

  const flights = RouteSearchEngine(planetFrom, planetTo);
  res.send({success: true, flights});
});

module.exports = router;
