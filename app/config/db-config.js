// Configure Sequelize and MySQL database
require('dotenv').config();

module.exports = {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || '123456789',
    DB: process.env.DB_NAME ||'dices_db',
    dialect: process.env.DB_dialect ||'mysql',
    port: process.env.DB_port || 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};