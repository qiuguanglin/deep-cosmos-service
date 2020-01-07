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
    const {fare, discount} = flightsMap.get(shuttles[0]); //for this version there's only one shuttle rouines from one place to the next
    totalPrice += fare * discount;
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
