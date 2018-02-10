import * as mutations from '@/src/store/mutations.js'

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
      
    })

    describe('maskAllCards', () => {
      
    })

    describe('showAllCards', () => {
      
    })

    describe('applyHiding', () => {
      
    })

    describe('queueCardToHide', () => {
      
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
  })
})