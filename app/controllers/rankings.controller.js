const db = require('../models');
const sequelize  = require('sequelize');
const Players = db.players;

// Players sorted by success percentage and includes average percentage 
exports.percentage = async (req, res) => {
    const sortedBySuccess = await Players.findAll({order: [['success', 'DESC']]});
    if (sortedBySuccess.length === 0) {
        return res.status(200).json({ error: "No games available." })
    }
    const averageSuccess = await Players.findAll({attributes: [[sequelize.fn('avg', sequelize.col('success')), 'averageSuccess']]});

    res.json({results: [...sortedBySuccess, ...averageSuccess]});
};

exports.loser = async (req, res) => {
    const loser = await Players.findAll({ attributes: [[sequelize.fn('MIN', sequelize.col('success')), 'minSuccess']] });
 
    if (loser[0].dataValues.minSuccess === null) {
        return res.status(200).json({ message: "There's no games yet." })
    }
    // In case there's many players with the same success percentage
    const losers = await Players.findAll({ where: { success: loser[0].dataValues.minSuccess}});
    res.send({ loser: losers });
}; 

exports.winner = async (req, res) => {
    const winner = await Players.findAll({ attributes: [[sequelize.fn('MAX', sequelize.col('success')), 'maxSuccess']] });
    if (winner[0].dataValues.maxSuccess === null) {
        return res.status(200).json({ message: "There's no games yet." });
    }
    // In case there's many players with the same success percentage
    const winners = await Players.findAll({ where: { success: winner[0].dataValues.maxSuccess}});
    res.send({ winner: winners });
}; 