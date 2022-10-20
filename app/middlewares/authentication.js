const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const config = require('../config/config');

app.set('password', config.password);

module.exports = authentication = (req, res, next) => {
    const token = req.headers['access-token'];  
    if (token) {
        jwt.verify(token, app.get('password'), (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token not valid.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Token not provided' });
    }    
}
