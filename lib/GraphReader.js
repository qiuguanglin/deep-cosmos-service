'use strict';

const path = require('path');
const fs = require('fs');
const BASE_PATH = process.cwd();

const [
    PLANET_DATA,
    ROUTES_DATA,
    SHUTTLES_DATA,
    FLIGHTS_DATA
  ] = ['../data/planet.json', '../data/route.json', '../data/shuttles.json', '../data/flight.json'];

const data2Obj = fpath => JSON.parse(fs.readFileSync(path.join(__dirname, fpath)));

//planet data contains data of the planets(stops) information
const planetList = data2Obj(PLANET_DATA);

//route cost map describes how to get from one planet(stop) to the other planets(stops) its routs
const routeCostMap = (function(){
  const costMap = new Map();
  const rawData = data2Obj(ROUTES_DATA);
  for(let i=0; i<rawData.length; i++){
    const {from, to} = rawData[i];
    costMap.set(from, to);
  }
  return costMap;
})();

//shuttle map contains what spaceship will transpass one another planet(stop)
const shuttlesMap = (function(){
  const map = new Map();
  const rawData = data2Obj(SHUTTLES_DATA);
  for(let i=0; i<rawData.length; i++){
    const {stop, shuttles} = rawData[i];
    map.set(stop, shuttles);
  }
  return map;
})();

//simply contains the spaceships information
const flightsMap = (function(){
  const map = new Map();
  const rawData = data2Obj(FLIGHTS_DATA);
  for(let i=0; i<rawData.length; i++){
    const {id, ...restProps} = rawData[i];
    map.set(id, restProps);
  }
  return map;
})();

module.exports = {planetList, routeCostMap, shuttlesMap, flightsMap};
