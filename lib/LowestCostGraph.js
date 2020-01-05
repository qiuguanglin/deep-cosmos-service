'use strict';

const {planetList, routeCostMap} = require('./GraphReader');
const PlanetEnum = planetList.reduce((obj, ele) => {obj[ele.name] = ele; return obj}, {});

const initializeGraph = source => {
  const costTable = planetList.reduce((obj, ele) => {obj[ele.name] = {
    cost: Infinity, isVisited: false, transfer: null}; return obj
  }, {});

  //the beginning node should be cost 0
  costTable[source].cost = 0;
  return costTable;
}

const allLowestRoutes = (source, costTable) => {
  //update its status to be visited so it will not be checked again
  costTable[source].isVisited = true;
  //get all the current node's neighbours that are't visited yet
  const neighbours = routeCostMap.get(source).filter(neighbour => !costTable[neighbour.name].isVisited);

  for(let i=0; i<neighbours.length; i++){
      const neighbour = neighbours[i];
      const newCost = costTable[source].cost + neighbour.price;
      const oldCost = costTable[neighbour.name].cost;
      //if the accumulation value is smaller than the old one meaning it is a shorter distance, so update it
      //and update its previous planet(stop)
      if(newCost < oldCost){
          costTable[neighbour.name].cost = newCost;
          costTable[neighbour.name].transfer = source;
      }
  }

  //filter those visited planets and finish the recursion if none left
  const unvisitedNodes = Object.keys(costTable).filter(planet => !costTable[planet].isVisited);
  if(unvisitedNodes.length===0)return;

  //and then get the one with shortest distance
  const lowestCostNext = unvisitedNodes.reduce((key, nextKey) => costTable[key].cost < costTable[nextKey].cost ? key : nextKey);

  allLowestRoutes(lowestCostNext, costTable);
}

module.exports = (source = PlanetEnum.earth.name) => {
  const costTable = initializeGraph(source);
  allLowestRoutes(source, costTable);
  return costTable;
}
