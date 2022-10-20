const db = require('../models');
const Players = db.players;
const Games = db.games;

exports.roll = async (req, res) => {
    const id = req.params.id;
    let win;
    // Check if this ID exists
    const findId = await Players.findOne({where: {id: id}});
    if (findId === null) {
        return res.status(400).json({ message: "There is no player with this ID." });
    } 

    // Roll the dices!
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    dice1 + dice2 === 7 ? win = true : win = false;
    
    const game = {
        dice1: dice1,
        dice2: dice2,
        win: win,
        playerId: id,
    };

    try {
        await Games.create(game);
        res.json(game);
        // Update ranking
        const sumGames = await Games.count({where: {playerId: id}});
        const sumWins = await Games.count({where: {playerId: id, win: 1}});
        await Players.update({success: 100 * (sumWins / sumGames)}, {where: {id: id}});
    } catch (err) {
        res.status(400).json({ error: "Wrong player ID." });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    // Check if this ID exists
    const findId = await Games.findOne({where: {playerId: id}});

    if (findId === null) {
        return res.status(400).json({ message: "There is no games for this ID." });
    };
    try {
        await Games.destroy({where: {playerId: id}});
        res.status(200).json({ message: `All games of player with ID ${id} deleted.` });
        await Players.update({success: 0}, {where: {id: id}});
    } catch (err) {
        res.status(400).json({ message: "Wrong player ID." });
    }
};

exports.findAll = async (req, res) => {
    const id = req.params.id;
    const games = await Games.findAll({ where: { playerId: id }});
    
    if (games.length === 0) {
        return res.status(204).send();
    }
    res.status(200).json({ results: games });
};