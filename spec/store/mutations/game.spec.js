import config from '@/src/utility/gameConfig'

// mocks go before to insure mock being imported
const mockModuleFunc = (path, field) => {
  const module = require(path)
  const real = module[field]
  module[field] = jest.fn(real)
}

mockModuleFunc('@/src/utility/shuffle', 'default')
mockModuleFunc('@/src/utility/getUniqueSet', 'default')

const mutations = require('@/src/store/mutations')
const {
  flipCard,
  fillBoard,
  applyHiding,
  showAllCards,
  maskAllCards,
  queueCardToHide
} = mutations

const shuffle = require('@/src/utility/shuffle').default
const getUniqueSet = require('@/src/utility/getUniqueSet').default


describe('Mutations', () => {
  describe('Game', () => {
    const state = {}

    beforeEach(() => {
      Object.assign(state, {
        board: [[]],
        score: 0,
        matched: 0,
        toHide: []
      })
    })
    describe('fillBoard', () => {
      let configBoardReal = config.board
      let configOptionsReal = config.cards.options
      let cardSet

      beforeEach(() => {
        config.board = {
          rows: 4,
          cols: 2,
          size: 8
        }

        config.cards.options = []
        for(let i = 0; i < config.board.size; ++i) {
          config.cards.options.push('c' + i.toString())
        }

        cardSet = config.cards.options.slice(0, config.board.size / 2)
      })

      afterAll(() => {
        config.board = configBoardReal
        config.cards.options = configOptionsReal
      })

      it('Gets random set of cards using getUniqueSet', () => {
        fillBoard(state)

        expect(getUniqueSet).toBeCalledWith(config.board.size / 2, config.cards.options)
      })

      it('Shuffles pairs of hydrated cards', () => {
        const expectHydratedCard = card => {
          // path returend from getUniqueSet
          expect(cardSet.indexOf(card.path)).not.toBe(-1)
          // value regardless of format
          expect(typeof card.value).not.toBe('undefined')
          // id regardless of format
          expect(typeof card.id).not.toBe(false)
          // face down
          expect(card.flipped).toBe(false)
          // visible
          expect(card.hidden).toBe(false)
        }
        getUniqueSet.mockReturnValueOnce(cardSet)

        fillBoard(state)

        const shuffleLastCall = shuffle.mock.calls[shuffle.mock.calls.length - 1]
        const passedCards = shuffleLastCall[0]  
        const usedValues = new Set()
        const usedIds = new Set()
        passedCards.forEach(card => {
          usedValues.add(card.value)
          usedIds.add(card.id)
        })
        
        passedCards.forEach(expectHydratedCard)
        expect(usedValues.size).toBe(config.board.size / 2)
        expect(usedIds.size).toBe(config.board.size)
      })
      
      it('Fills board with results of shuffling', () => {
        const cards = cardSet.map(path => ({path}))
  
        shuffle.mockReturnValueOnce(cards)
  
        let i
        state.board.forEach(row => {
          row.forEach(card => {
            expect(card).toBe(cards[i])
            ++i
          })
        })
      })
    })

    describe('maskAllCards', () => {
      it('Masks all cards in board', () => {
        const card1 = {flipped: true}
        const card2 = {flipped: false}
        const card3 = {flipped: true}
        state.board[0].push(card1, card2)
        state.board.push([card3])
        
        maskAllCards(state)
        
        const cards = [card1, card2, card3]
        cards.forEach(card => {
          expect(card.flipped).toBe(false)
        })
      })
    })

    describe('showAllCards', () => {
      it('Shows all cards in board', () => {
        const card1 = {
          flipped: false,
          hidden: false
        }
        const card2 = {
          flipped: false,
          hidden: true
        }
        const card3 = {
          flipped: true,
          hidden: false
        }
        state.board[0].push(card1, card2)
        state.board.push([card3])
        
        showAllCards(state)
        
        const cards = [card1, card2, card3]
        cards.forEach(card => {
          expect(card.flipped).toBe(true)
          expect(card.hidden).toBe(false)
        })
      })
    })

    describe('applyHiding', () => {
      it('Hides all cards in toHide', () => {
        const card1 = {hidden: true}
        const card2 = {hidden: false}
        const card3 = {hidden: false}
        const cards = [card1, card2, card3]
        state.toHide = [...cards]
        
        applyHiding(state)
        
        cards.forEach(card => expect(card.hidden).toBe(true))
      })

      it('Only hides cards in toHide', () => {
        const cardIdle = {hidden: false}

        applyHiding(state)

        expect(cardIdle.hidden).toBe(false)
      })
    })

    describe('queueCardToHide', () => {
      it('Puts card in toHide', () => {
        const card = {}

        queueCardToHide(state, card)

        expect(state.toHide.indexOf(card)).not.toBe(-1)
      })
    })

    describe('setScore', () => {
      it('Sets score', () => {
        mutations.setScore(state, -Infinity)
        expect(state.score).toBe(-Infinity)

        mutations.setScore(state, 153)
        expect(state.score).toBe(153)

        mutations.setScore(state, 0)
        expect(state.score).toBe(0)
      })
    })

    describe('setMatched', () => {
      it('Sets matched', () => {
        mutations.setMatched(state, 2)
        expect(state.matched).toBe(2)

        mutations.setMatched(state, 154)
        expect(state.matched).toBe(154)

        mutations.setMatched(state, 0)
        expect(state.matched).toBe(0)
      })
    })

    describe('flipCard', () => {
      it('Flips card', () => {
        const card = {flipped: false}
        state.board[0].push(card)

        flipCard(state, card)
        expect(state.board[0][0].flipped).toBe(true)

        flipCard(state, card)
        expect(state.board[0][0].flipped).toBe(false)
      })
    })
  })
})