

describe('Battle', () => {
  const Battle = require('../public/javascripts/battle');
  it('inititalizes with player 1', () => {

    let battle = new Battle()
    expect(battle.player).toEqual('Captain Planet')
  })
})