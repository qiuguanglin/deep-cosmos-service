'use strict';

const {planetList, routeCostMap} = require('./GraphReader');
const PlanetEnum = planetList.reduce((obj, ele) => {obj[ele.name] = ele; return obj}, {});

const initializeGraph = source => {
  const costTable = planetList.reduce((obj, ele) => {obj[ele.name] = {
    cost: Infinity, isVisited: false, transfer: null}; return obj
  }, {});

  costTable[source].cost = 0;
  return costTable;
}

const allLowestRoutes = (source, costTable) => {
  costTable[source].isVisited = true;
  const neighbours = routeCostMap.get(source).filter(neighbour => !costTable[neighbour.name].isVisited);

  for(let i=0; i<neighbours.length; i++){
      const neighbour = neighbours[i];
      const newCost = costTable[source].cost + neighbour.price;
      const oldCost = costTable[neighbour.name].cost;
      if(newCost < oldCost){
          costTable[neighbour.name].cost = newCost;
          costTable[neighbour.name].transfer = source;
      }
  }

  const unvisitedNodes = Object.keys(costTable).filter(node=>!costTable[node].isVisited);
  if(unvisitedNodes.length===0)return;

  const lowestCostNext = unvisitedNodes.reduce((key, nextKey)=>Math.min(costTable[key].cost < costTable[nextKey].cost) ? key : nextKey);

  allLowestRoutes(lowestCostNext, costTable);
}

module.exports = (source = PlanetEnum.earth.name) => {
  const costTable = initializeGraph(source);
  allLowestRoutes(source, costTable);
  return costTable;
}
