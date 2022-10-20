const mongoose = require('mongoose');

const Player = mongoose.model(
    "player",
    mongoose.Schema({
        name: String,
        success: { type: Number, default: 0 },
        regDate:  { type: Date, default: Date.now },
        games: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Game'
            }
        ]
    },
    {
        versionKey: false
    })
);

module.exports = Player;