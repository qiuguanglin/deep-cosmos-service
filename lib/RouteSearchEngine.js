'use strict';

const CostGraph = require('./LowestCostGraph');
const Transfer = require('./ShuttleTransfer');
const {flightsMap} = require('./GraphReader');

//calculate the final fare of the ticket
// equation: finalFare = Sum(originalFare) * discount * (totalWeight / 10)
const calculateFinalPrice = line => {
  let totalPrice = 0;
  const transfers = line.transfers;
  for (let i = 0; i < transfers.length; i++) {
    const shuttles = transfers[i].shuttles;
    for (var j = 0; j < shuttles.length; j++) {
      const shuttle = flightsMap.get(shuttles[j]);
      const {fare, discount} = shuttle;
      totalPrice += fare * discount
    }
  }

  return totalPrice * (line.totalWeight / 10);
}

module.exports = (start, destination) => {
  const costTable = CostGraph(start);
  const line = Transfer(destination, costTable);
  const totalPrice = calculateFinalPrice(line);
  line.totalPrice = totalPrice;
  return line;
}
