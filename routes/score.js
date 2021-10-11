const express = require('express');

const scoreRouter = express.Router();

const ScoreController = require('../controllers/score');

/* GET users listing. */
scoreRouter.post('/', ScoreController.New);
scoreRouter.get('/', ScoreController.Index);

module.exports = scoreRouter;
