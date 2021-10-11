const express = require('express');

const scoreRouter = express.Router();

const ScoreController = require('../controllers/score');

scoreRouter.post('/', ScoreController.New);

module.exports = scoreRouter;
