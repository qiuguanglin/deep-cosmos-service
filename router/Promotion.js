'use strict';

const router = require('express').Router();

router.get('/promotionList', (req, res) => {
  const fakeData = {
    desc: '火星五天四夜游，攀登火星最高峰奥林匹斯山，黄昏浪漫看日落，早上温馨看地出，来回飞船价钱包含',
    price: 4000
  };

  res.send({success: true, promotions: [fakeData, fakeData, fakeData]});
});

module.exports = router;
