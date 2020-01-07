'use strict';

const router = require('express').Router();
const {flightsMap, planetList, routeCostMap} = require('../lib/GraphReader');

router.get('/flights', (req, res) => {
  const flightsMapSerielizedObj = {};
  const routeMapSerielizedObj = {};

  //since structures as Set and Map cannot be serielzed to transmit via the internet so here is to conver them to objects
  flightsMap.forEach((value, key) => flightsMapSerielizedObj[key] = value);
  routeCostMap.forEach((value, key) => {
    //return the structure as {currentPlanet: {neighbour: {neighbourDistance}}}
    //here the property of "weight" is excluded because frontend won't use it to calcuate the price per each section
    const neighbour = value.reduce((obj, next) => {obj[next.name] = {distance: next.distance}; return obj}, {});
    routeMapSerielizedObj[key] = neighbour;
  });

  const message = {
    flightsMap: flightsMapSerielizedObj,
    routeCostMap: routeMapSerielizedObj,
    planetList,
  }
  res.send({success: true, message});
});

module.exports = router;
