'use strict';

const router = require('express').Router();
const RouteSearchEngine = require('../lib/RouteSearchEngine');
const PlanetEnum = require('../lib/PlanetEnum');
const Logger = require('../Logger')('SearchService');

router.get('/flights/:from/:to', (req, res) => {
  let {from, to} = req.params;
  if(from.toLowerCase().trim() === to.toLowerCase().trim()){
    return res.send({success: false, message: 'start and destination cannot be identical'});
  }

  if(isNaN(from) || isNaN(to)){
    return res.send({success: false, message: 'only the number(such as 001 or 101) if places are accepted'});
  }

  Logger.info('searching route from %s to %s', from, to);
  try{
    const flights = RouteSearchEngine(from, to);
    res.send({success: true, message: flights});
  }catch(err){
    Logger.warn(err);
    res.send({success: false});
  }
});

module.exports = router;
