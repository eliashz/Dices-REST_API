const mongoose = require('mongoose');

const Game = mongoose.model(
    'Game',
    mongoose.Schema({
        dice1: Number,
        dice2: Number,
        win: Boolean,
    },
    {
        versionKey: false
    })
);

module.exports = Game;