'use strict';

const {shuttlesMap, flightsMap} = require('./GraphReader');

const getStationsTo = (destination, costTable) => {
    const previous = costTable[destination].transfer;
    if(previous === null)return [destination];
    const tracks = getStationsTo(previous, costTable);
    tracks.push(destination);
    return tracks;
}

const getTransfersBetween = (from, to) => {
    const fromShuttles = shuttlesMap.get(from);
    const toShuttles = shuttlesMap.get(to);
    const intersection = fromShuttles
      .filter(st=>toShuttles.indexOf(st)>=0)
      .map(st=>flightsMap.get(st).name);

    return intersection;
}

const getAllTransfers = stationsOnTheWay => {
    const transfers = [];
    for(let i=0; i<stationsOnTheWay.length-1; i++){
        const from = stationsOnTheWay[i];
        const to = stationsOnTheWay[i+1];
        const intersection = getTransfersBetween(from, to);
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
