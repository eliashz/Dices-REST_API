// Define the Sequelize Games Model

module.exports = (sequelize, DataTypes) => {
    const Games = sequelize.define("games", {
        dice1: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dice2: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        win: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    },
    {
        timestamps: false,
    });
    return Games;
};