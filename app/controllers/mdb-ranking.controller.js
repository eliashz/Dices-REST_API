const Player = require('../models/mdb-player.model');

// Players sorted by success percentage and includes average percentage 
exports.percentage = async (req, res) => {
    const sortedBySuccess = await Player.find({}).sort([['success', 'descending']]);
    if (sortedBySuccess.length === 0) {
        return res.status(200).json({ error: "No games available." })
    }

    const averageSuccess = await Player.aggregate([{ $group: { _id: null, avgSuccess: { $avg: '$success' }}}]).exec();
    const avgSuccess = { avgSuccess: averageSuccess[0].avgSuccess}
    res.json({results: [...sortedBySuccess, avgSuccess]});
};

exports.loser = async (req, res) => {
    const loser = await Player.aggregate([{ $match: {games: {$ne: []} } },{ $group: { _id: null, min: { $min: '$success' }}}]).exec();
    if (loser.length === 0) {
        return res.status(200).json({ message: "There's no games yet."})
    }
    // In case there's many players with the same success percentage
    const losers = await Player.find({$and: [{ success: { $eq: loser[0].min}}, {games: {$ne: []}}]});
    res.send({ loser: losers });
}; 

exports.winner = async (req, res) => {
    const winner = await Player.aggregate([{ $match: {games: {$ne: []} } },{ $group: { _id: null, max: { $max: '$success' }}}]).exec();
    if (winner.length === 0) {
        return res.status(200).json({ message: "There's no games yet."});
    }
    // In case there's many players with the same success percentage
    const winners = await Player.find({$and: [{ success: { $eq: winner[0].max}}, {games: {$ne: []}}]});
    res.send({ winner: winners });
}; 