'use strict';

const router = require('express').Router();
const RouteSearchEngine = require('../lib/RouteSearchEngine');
const PlanetEnum = require('../lib/PlanetEnum');

router.get('/flights/:from/:to', (req, res) => {
  let {from, to} = req.params;
  if(from.toLowerCase().trim() === to.toLowerCase().trim()){
    return res.send({success: false, message: 'start and destination cannot be identical'});
  }

  const [planetFrom, planetTo] = [PlanetEnum[from], PlanetEnum[to]];
  if(!planetFrom || !planetTo){
    return res.send({success: false, message: 'no results found'});
  }

  console.log('sarching for', planetFrom, planetTo);
  const flights = RouteSearchEngine(planetFrom, planetTo);
  res.send({success: true, message: flights});
});

module.exports = router;
