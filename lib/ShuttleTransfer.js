'use strict';

const {shuttlesMap, flightsMap} = require('./GraphReader');

//find out all tracks from the beginning to the destination, such as: from earth to jupiter
const getStationsTo = (destination, costTable) => {
    //a planet has no transfer meaning it is the very first planet(the original stop)
    const previous = costTable[destination].transfer;
    //if so end the recursion
    if(previous === null)return [destination];
    //otherwise use its transfer and check "its transfer's transfer", and so on
    const tracks = getStationsTo(previous, costTable);
    //and each found tranfer into an array
    tracks.push(destination);
    return tracks;
}

// find out the same spaceship that runs between 2 planets, like spaceshipA will be passing earth and jupiter
const getTransfersBetween = (from, to) => {
    const fromShuttles = shuttlesMap.get(from);
    const toShuttles = shuttlesMap.get(to);
    const intersection = fromShuttles
      .filter(st=>toShuttles.indexOf(st)>=0)
      .map(st=>flightsMap.get(st).name);

    return intersection;
}

//find out all shared spaceships
const getAllTransfers = stationsOnTheWay => {
    const transfers = [];
    for(let i=0; i<stationsOnTheWay.length-1; i++){
      //extract the current planet and the next planet
      const from = stationsOnTheWay[i];
      const to = stationsOnTheWay[i+1];
      //if they share the same spaceship, like if they share spaceshipA, meaning spaceshipA will transpass them
      const intersection = getTransfersBetween(from, to);
      //or there is mistake calculating the graph, which tells me there is a way connected but I do see any
      if(!intersection)
        throw Error(`algorithm may have given a wrong path, no connection between ${from} and ${to}`);
      transfers.push({board: from, land: to, shuttle: intersection});
    }
    return transfers;
}

module.exports = (destination, costTable) => {
  const stationsOnTheWay = getStationsTo(destination, costTable);
  return getAllTransfers(stationsOnTheWay);
}
