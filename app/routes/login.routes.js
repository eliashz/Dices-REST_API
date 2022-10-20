const router = require('express').Router();
const login = require('../controllers/login.controller');

router.post('/', login.postLogin);

module.exports = router;
