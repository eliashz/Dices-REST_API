require('dotenv').config();

module.exports = {
    url: process.env.MDB_URI || "mongodb://localhost:27017/dices_db"
};