const router = require('express').Router();
const games = require('../controllers/mdb-game.controller');

// A player plays
router.post('/:id', games.roll);
// Delete games by player ID
router.delete('/:id', games.delete);
// Show the games of a player
router.get('/:id', games.findAll);

module.exports = router;