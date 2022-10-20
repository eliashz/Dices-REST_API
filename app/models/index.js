const dbConfig = require('../config/db-config.js');
const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');

// Create MySQL data base
( async () => {
    const con = await mysql.createConnection({
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
    })
    await con.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DB};`);
    try {
        await db.sequelize.sync()
        console.log("Synced MySQL.");
    }  catch (err) {
        console.log("Failed to sync db: " + err.message);
    }
})();

// Initialize Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operarorAliases: false,
    logging: false, // true for development only
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.players = require('./players.model')(sequelize, Sequelize);
db.games = require('./games.model')(sequelize, Sequelize);

// One-to-many relationship between Players and Games. 
db.players.hasMany(db.games);

module.exports = db;