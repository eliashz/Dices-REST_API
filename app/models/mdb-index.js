const dbConfig = require('../config/mdb-config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const mdb = {};
mdb.mongoose = mongoose;
mdb.url = dbConfig.url;
mdb.player = require('./mdb-player.model')(mongoose);
mdb.game = require('./mdb-game.model')(mongoose);

const initMDB = () => {
    mdb.mongoose
    .connect(mdb.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB."))
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });
}

module.exports = {mdb, initMDB};