// Define the Sequelize Players Model

module.exports = (sequelize, DataTypes) => {
    const Players = sequelize.define("players", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'anonymous'
        },
        success: {
            type: DataTypes.FLOAT(5,2),
            allowNull: false,
            defaultValue: 0,
        },
        regDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    },
    {
        timestamps: false,
    });
    return Players;
};