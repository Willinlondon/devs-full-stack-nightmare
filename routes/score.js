const express = require('express');

const scoreRouter = express.Router();

const ScoreController = require('../controllers/score');

/* GET users listing. */
scoreRouter.post('/', ScoreController.New);

module.exports = scoreRouter;
