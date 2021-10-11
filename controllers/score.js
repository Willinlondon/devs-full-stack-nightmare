// const Score = require('../model/score');

const ScoreController = {
  async New(req, res) {
    try {
      console.log('This is the score controller');
      res.render('scores');
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = ScoreController;
