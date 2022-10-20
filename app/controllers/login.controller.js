const config = require('../config/config');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

exports.postLogin = (req, res) => {
    app.set('password', config.password);
    
    if (req.body.user === "ehz" && req.body.password === '1234') {
        const payload = { check: true};
        const token = jwt.sign(payload, app.get('password'));   
        res.json({
            message: "Correct authentication.",
            token
        });
    } else {
        res.json({ message: "Wrong user or password."})
    }
}