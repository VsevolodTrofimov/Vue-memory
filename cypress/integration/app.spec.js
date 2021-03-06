import config from '../../src/utility/gameConfig.js'


// order of e2e tests matters
describe('Memory Game', function() {
  let cards, lastScore

  const assertInitialState = () => {
    cy.get('[data-tid^="Card"]').should('have.length', config.board.size)
    cy.get('[data-tid="Menu-scores"]').should('have.text', '0')
  }

  it('Starts game on start game click', function() {  
    cy.visit('/')
    
    cy.wait(500)

    cy.screenshot('Start View')
    
    cy.get('[data-tid="NewGame-startGame"]').click()

    cy.get('[data-tid="Deck"]').should('be.visible')
  })

  it('Has restart option', () => {
    cy.get('[data-tid="Menu-newGame"]')
      .click()
    assertInitialState()
  })

  it('Hides all cards after around config.initialVisibleTime', () => {
    cy.get('[data-tid="Menu-newGame"]')
      .click()

    // timers are not fully accurate in js, so we check with 0.1 loss
    cy.wait(config.initialVisibleTime * 0.9)
    cy.get('[data-tid="Card-flipped"]').should('have.length', config.board.size)
    
    cards = []
    cy.get('[data-tid^="Card"] img').each($img => {
      cards.push($img.attr('src'))
    })

    cy.wait(config.initialVisibleTime * 0.2)
    cy.get('[data-tid="Card"]').should('have.length', config.board.size)

    cy.screenshot('Game View')
  })

  it('Flips single card, and does so once', () => {
    cy.get('[data-tid^="Card"]')
      .first()
      .click()
    
    cy.get('[data-tid^="Card"]')
      .first()
      .should('have.attr', 'data-tid', 'Card-flipped')
    
    // try to flip much our first card again
    cy.get('[data-tid^="Card"]')
      .first()
      .click()
    
    cy.get('[data-tid^="Card"]')
      .first()
      .should('have.attr', 'data-tid', 'Card-flipped')
  
    cy.get('[data-tid="Card-flipped"]')
      .should('have.length', 1)
  })


  // return pair of cards and removes them from cards to be in SYNC with DOM
  const matchCards = (cards, target) => {
    const result = []

    cards.forEach((cardId, idx) => {
      if(cardId === target) result.push(idx)
    })

    result.forEach((idx, removed) => cards.splice(idx - removed, 1))

    return result
  }

  it('Adds score for matching cards', () => {
    const expectedScore = config.calcScore.success(0, config.board.size) 
    const matchingCard = matchCards(cards, cards[0])[1]

    cy.get('[data-tid^="Card"]')
      .eq(matchingCard)
      .click()
    
    cy.get('[data-tid="Menu-scores"]')
      .should('have.text', expectedScore.toString())
    
    cy.wait(config.matchedVisibleTime)
  })

  it('Substracts score for mismatching cards', () => {
    const scoreAfterMatch = config.calcScore.success(0, config.board.size)
    const expectedScore = scoreAfterMatch + config.calcScore.failure(2, config.board.size - 2)
    const mismatchingCard = cards[0] === cards[1] ? 2 : 1

    cy.get('[data-tid^="Card"]')
      .first()
      .click()

    cy.get('[data-tid^="Card"]')
      .eq(mismatchingCard)
      .click()
    
    cy.get('[data-tid="Menu-scores"]')
      .should('have.text', expectedScore.toString())

    cy.wait(config.matchedVisibleTime)
  })

  it('Adds score for matching cards', () => {
    const gameLoop = () => {
      if(cards.length) {
        const matchingCard = matchCards(cards, cards[0])[1]

        cy.get('[data-tid^="Card"]')
          .first()
          .click()

        cy.get('[data-tid^="Card"]')
          .eq(matchingCard)
          .click()

        cy.wait(config.matchedVisibleTime).then(gameLoop)
      }
    }

    gameLoop()

    cy.get('[data-tid="EndGame-finalScore"]')
      .should('be.visible')
  })

  it('Is has right final score', () => {

    const scoreAfterMatch = config.calcScore.success(0, config.board.size)
    const mismatchDiff = config.calcScore.failure(2, config.board.size - 2)

    let score = scoreAfterMatch + mismatchDiff
    let diff = 0
    let unmatched = config.board.size - 2

    while(unmatched) {
      diff = config.calcScore.success(config.board.size - unmatched, unmatched)
      
      score += diff
      unmatched -= 2
    }

    cy.get('[data-tid="EndGame-finalScore"]')
      .should('have.text', score.toString())

    cy.screenshot('End view')
  })

  it('Is replayable', () => {
    cy.get('[data-tid="EndGame-retryGame"]')
      .click()
    
    assertInitialState()
  })
})