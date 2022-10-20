const db = require('../models');
const Players = db.players;

// Create new player
exports.create = async (req, res) => {
    let player;
    if (!req.body.name) {
        player = {name: "anonymous"};
    } else {
         // Check if there is a player with this name
        const findPlayer = await Players.findOne({where: {name: req.body.name.trim()}});
        if (findPlayer !== null) {
            return res.status(400).json({ message: "Player name is used." });
        } 
        // If the name is empty or with spaces player name will be anonymous
        !req.body.name.trim() ? player = {name: "anonymous"} : player = {name: req.body.name};
    }
    const playerCreated = await Players.create(player);
    res.status(200).json({message: "Player created.", player: playerCreated});
};

// Update player
exports.update = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }
    const id = req.params.id;

    // Check if this ID exists
    const findId = await Players.findOne({where: {id: id}});

    if (findId === null) {
        return res.status(400).json({message: "There is no player with this ID."});
    } 

    // Check if there is a player with this name
    const findPlayer = await Players.findOne({where: {name: req.body.name.trim()}});
    if (findPlayer !== null) {
        return res.status(400).json({message: "Player name is used."});
    } 

    try {
        await Players.update(!req.body.name.trim() ? req.body = {name: "anonymous"} : req.body, {where: {id: id}});
        res.status(200).json({ message: "Player updated." });
    } catch (err)  {
        res.status(400).json({ message: "Wrong player ID." });
    }
};

// Find all players and success percentage
exports.findAll = async (req, res) => {
    const players = await Players.findAll();
    
    if (players.length === 0) {
        return res.status(204).send(); // No players in the game. 
    }
    try {
        return res.status(200).json({ results: players });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};
