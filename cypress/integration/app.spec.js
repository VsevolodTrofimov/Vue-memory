// because cypress 
import 'babel-polyfill'

import config from '../../src/utility/gameConfig.js'


// order of e2e tests matters
describe('Memory Game', function() {
  const assertInitialState = () => {
    cy.get('[data-tid^="Card"]').should('have.length', config.board.size)
    cy.get('[data-tid="Menu-scores"]').should('have.text', '0')
  }

  it('Starts game on start game click', function() {
    const loadLoop = () => {
      const deck = cy.get('[data-tid="Deck"]')
      if(deck) {
        deck.should('be.visible')
        assertInitialState()
      } else {
        // url is constant, so for preload manually
        cy.wait(10)
        loadLoop()
      }
    }
    
    cy.visit('/')
    
    cy.get('[data-tid="NewGame-startGame"]').click()

    loadLoop()
  })

  it('has restart option', () => {
    cy.get('[data-tid^="Card"').first().click()
    cy.get('[data-tid="Menu-newGame"]').click()
    assertInitialState()
  })

  it('hides all cards after around config.initialVisibleTime', () => {
    cy.get('[data-tid="Menu-newGame"]').click()
    const waitTime = config.initialVisibleTime
    // timers are not fully accurate in js, so we check with 0.1 loss
    cy.wait(waitTime * 0.9)
    cy.get('[data-tid="Card-flipped"]').should('have.length', config.board.size)
    
    cy.wait(waitTime * 0.2)
    cy.get('[data-tid="Card"]').should('have.length', config.board.size)
  })

  it('flips single card, and does so once', () => {
    cy.get('[data-tid^="Card"]')
      .first()
      .click()
    cy.get('[data-tid^="Card"]').first()
      .should('have.attr', 'data-tid', 'Card-flipped')
    
    // pretty much our first card again
    cy.get('[data-tid^="Card"]')
      .first()
      .click()
    cy.get('[data-tid^="Card"]').first()
      .should('have.attr', 'data-tid', 'Card-flipped')
  })

  it('gives score for matching cards', async () => {
    const expectedScore = config.calcScore.success(0, config.board.size)

    const $el = await cy.get('[data-tid="Card-flipped"] img').first()
    const src = $el.attr('src')

    await cy.get('[data-tid="Card"]').contains(`img[src="${src}"]`).click()
    return cy.get('[data-tid="Menu-scores"]').should('have.text', expectedScore)
  })
})