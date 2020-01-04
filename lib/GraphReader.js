'use strict';

const fs = require('fs');
const [
    PLANET_DATA,
    ROUTES_DATA,
    SHUTTLES_DATA,
    FLIGHTS_DATA
  ] = ['../data/planet.json', '../data/route.json', '../data/shuttles.json', '../data/flight.json'];

const data2Obj = path => JSON.parse(fs.readFileSync(path));

const planetList = data2Obj(PLANET_DATA);

const routeCostMap = (function(){
  const costMap = new Map();
  const rawData = data2Obj(ROUTES_DATA);
  for(let i=0; i<rawData.length; i++){
    const {from, to} = rawData[i];
    costMap.set(from, to);
  }
  return costMap;
})();

const shuttlesMap = (function(){
  const map = new Map();
  const rawData = data2Obj(SHUTTLES_DATA);
  for(let i=0; i<rawData.length; i++){
    const {stop, shuttles} = rawData[i];
    map.set(stop, shuttles);
  }
  return map;
})();

const flightsMap = (function(){
  const map = new Map();
  const rawData = data2Obj(FLIGHTS_DATA);
  for(let i=0; i<rawData.length; i++){
    const {id, name, cname, capacity, discount} = rawData[i];
    map.set(id, {name, cname, capacity, discount});
  }
  return map;
})();

module.exports = {planetList, routeCostMap, shuttlesMap, flightsMap};