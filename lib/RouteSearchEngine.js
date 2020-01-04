'use strict';

const Graph = require('./LowestCostGraph');
const Transfer = require('./ShuttleTransfer');

const {planetList} = require('./GraphReader');
const PlanetEnum = planetList.reduce((obj, ele) => {obj[ele.name] = ele; return obj}, {});

const costTable = Graph(PlanetEnum.uranus.name);
console.log(costTable);
console.log(Transfer(PlanetEnum.jupiter.name, costTable))

// module.exports = (begin, destination) => {
//   const costTable = Graph(begin);
//   const transfers = Transfer(PlanetEnum.jupiter.name, costTable)
// }
