const express = require('express');
const fs = require('fs');
const fetch = require('isomorphic-fetch');
const scorumJS = require('@scorum/scorum-js');

const router = express.Router();

scorumJS.api.setOptions({ url: process.env.RPC_URL });
scorumJS.config.set('address_prefix', 'SCR');
scorumJS.config.set('chain_id', process.env.CHAIN_ID);

// health checker
router.get('/health', (req, res) => {
  res.sendStatus(200);
});

function roundToHour(date) {
  const p = 60 * 60 * 1000; // milliseconds in an hour
  return new Date(Math.floor(date.getTime() / p) * p);
}

// helpfull stats
router.get('/stats', async (req, res) => {
  const CIRCULATING_CAP = 29265074.8;
  const tradesUrl = 'https://api-wallet.scorum.com/trade/openledger';
  // const globalProp = await scorumJS.api.getDynamicGlobalPropertiesAsync();

  const fromDate = roundToHour(new Date((Date.now() - 24 * 60 * 60 * 1000))).toISOString().split('.')[0];
  const toDate = roundToHour(new Date()).toISOString().split('.')[0];

  const stats = await scorumJS.api.getStatsForIntervalAsync(fromDate, toDate);

  // const circulatingCap = parseFloat(globalProp.circulating_capital.slice(0, -3));
  // const totalScorumpower = parseFloat(globalProp.total_scorumpower.slice(0, -3));
  // const contentRewardBalance = parseFloat(globalProp.content_reward_sp_balance.slice(0, -3));

  const trades = await fetch(tradesUrl).then(trade => trade.json());

  res.json({
    cap: CIRCULATING_CAP * trades.USD,
    operations: stats.operations * 1,
  });
});

/* GET home page. */
router.get('/*', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, text) => {
    res.send(text.replace(/\/\*G_TAG\*\//g, process.env.GTAG));
  });
});

module.exports = router;
