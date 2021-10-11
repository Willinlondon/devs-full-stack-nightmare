// const Score = require('../model/score');

const ScoreController = {
  async New(req, res) {
    try {
      console.log('This is the score controller');
      res.redirect('/score');
    } catch (error) {
      console.log(error.message);
    }
  },
  async Index(req, res) {
    try {
      console.log('This is the score index');
      res.render('scores/index');
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = ScoreController;
