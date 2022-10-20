const router = require('express').Router();
const rankings = require('../controllers/mdb-ranking.controller.js');

// Ranking sorted by success percentage and average percentage
router.get('/', rankings.percentage);
// Player with best percentage
router.get('/loser', rankings.loser);
// Player with worst percentage
router.get('/winner', rankings.winner);

module.exports = router;