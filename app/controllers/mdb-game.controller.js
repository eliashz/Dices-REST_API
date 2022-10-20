const Game = require('../models/mdb-game.model');
const Player = require('../models/mdb-player.model');

exports.roll = async (req, res) => {
    const id = req.params.id;
    let win;

    // Check if this ID exists
    try {
        const findId = await Player.findById(id);
        if (findId.length === 0) {
            return res.status(400).json({message: "There is no player with this ID."});
        } 
    } catch {
        return res.status(400).json({message: "Wrong player ID."});
    }   

    // Roll the dices!
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    dice1 + dice2 === 7 ? win = true : win = false;
    
    const game = new Game({
        dice1: dice1,
        dice2: dice2,
        win: win,
    });

    game.save();

    try {
        await Player.findByIdAndUpdate(id, {'$push': {games: game}})
        res.status(201).json(game);
    } catch {
        res.status(400).json({error: "Wrong player ID."});
    }

    // Update success
    const allGames = await Player.findById(id).populate('games').exec();
    const gamesWon = allGames.games.filter(game => game.win === true).length;
    const gamesPlayed = allGames.games.length;
    await Player.findByIdAndUpdate(id, {success: (100 * gamesWon / gamesPlayed).toFixed(2)});
};

// Delete games
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const findId = await Player.findById(id);
        if (!findId || findId.games.length === 0 ) {
            return res.status(400).json({message: "There is no games for this player ID."});
        }
    } catch {
        return res.status(400).json({message: "Wrong player ID."});
    }

    const findDelete = await Player.findByIdAndUpdate(id, {games: [], success: 0})
    if (!findDelete) {
        return res.status(400).json({ message: "There is no games for this ID." });
    }
    res.status(202).json({message: `All games of player with ID ${id} deleted.`});
   
};

// Find all games of a player
exports.findAll = async (req, res) => {
    const id = req.params.id;
    try {
        const games = await Player.findById(id).populate('games').exec();
        if (!games || !games.games.length) {
            return res.status(400).json({message: "There is no games for this player ID."});
        }
        res.json({results: games.games});
    } catch {
        return res.status(400).json({ message: "Wrong ID." });
    }
};