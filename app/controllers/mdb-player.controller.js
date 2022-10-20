const Player = require('../models/mdb-player.model');

// Create new player
exports.create = async (req, res) => {
    let playerName = req.body.name;
    
    // If there's nothing in the body, create an anonymous player.
    if (!playerName || !req.body.name.trim()) {
        playerName = "anonymous";
    } else {
        // Check if there is a player with this name 
        const findPlayer = await Player.findOne({name: playerName}).exec()
        if (findPlayer) {
            return res.status(400).json({ message: "Player name is used." });
        } 
    }
    const player = new Player({
        name: playerName
    });
    const playerCreated = await player.save()
    res.status(201).json({ message: "Player created.", player: playerCreated });
};

// Update player
exports.update = async (req, res) => {
    const id = req.params.id;

    // Check if the body is empty
    if (req.body.name === 'undefined') {
        res.status(400).json({ message: "Content can not be empty!" });
    }
    
    // Check if this ID exists
    try {
        const findId = await Player.findById(id);
        if (!findId) {
            return res.status(400).json({ message: "There is no player with this ID." });
        } 
    } catch {
        return res.status(400).json({ message: "Wrong player ID." });
    }
  
    // Check if there is a player with this name 
    const findPlayer = await Player.findOne({name: req.body.name}).exec();
    if (findPlayer) {
        return res.status(400).json({ message: "Player name is used." });
    } 

    try {
        await Player.findOneAndUpdate({_id: id}, !req.body.name.trim() ? req.body = {name: "anonymous"} : req.body);
        res.json({ message: "Player updated." });
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

// Find all players and success percentage
exports.findAll = (req, res) => {
    Player.find()
        .then(data => {
            if (data.length === 0) {
                return res.status(204).send();
            }
            return res.status(200).json({ results: data });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
};
