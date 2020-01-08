'use strict';

const router = require('express').Router();
const promotionData= require('../lib/PromotionReader');


router.get('/promotionList', (req, res) => {
  res.send({success: true, message: promotionData});
});

module.exports = router;
