const router = require('express').Router();
const players = require('../controllers/players.controller.js');

// Create player
router.post('/', players.create);
// Update player name given an ID
router.put('/:id', players.update);
// Show all the players and success percentage
router.get('/', players.findAll);

module.exports = router;
