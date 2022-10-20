require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const { initMDB } = require('./app/models/mdb-index');

const corsOptions = {
    origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// Parse requests of content-type
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({ message: "Let's roll the dices!" });
});

// JWT middleware
const protectedRoutes = express.Router();
protectedRoutes.use(require('./app/middlewares/authentication'));
app.use('/api/login', require('./app/routes/login.routes'));

// Select mysql or mongodb on .env
if (process.env.DATABASE === 'mysql'){    
    // Routes MySQL
    app.use('/api/players', protectedRoutes, require('./app/routes/players.routes'));
    app.use('/api/games', protectedRoutes, require('./app/routes/games.routes'));
    app.use('/api/rankings', protectedRoutes, require('./app/routes/rankings.routes'));
    
} else if (process.env.DATABASE === 'mongodb') {
    initMDB();
    // Routes MongoDB
    app.use('/api/players', protectedRoutes, require('./app/routes/mdb-player.routes'));
    app.use('/api/games', protectedRoutes, require('./app/routes/mdb-game.routes'));
    app.use('/api/rankings', protectedRoutes, require('./app/routes/mdb-ranking.routes'));
} else {    
    console.log("Unknown database.");
}

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: {message: error.message} })
}); 

// Set port, listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.`));