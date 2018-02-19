import * as getters from '@/src/store/getters.js'


describe('Getters', () => {
  describe('Game', () => {
    const state = {}

    beforeEach(() => {
      state.board = [
        [{flipped: true}, {flipped: true}],
        [{flipped: false}, {flipped: true}],
        [{flipped: false}, {flipped: false}],
      ]

      state.board.forEach((row, rowIdx) => {
        row.forEach((card, colIdx) => {
          card.id = `${rowIdx}-${colIdx}`
        })
      })
    })

    describe('flipped', () => {
      it('calculates number of flipped cards', () => {
        const flipped = getters.flipped(state)
        const flippedIds = flipped.map(card => card.id)
        const expectedIds = ['0-0', '0-1', '1-1']

        expectedIds.forEach(id => {
          expect(flippedIds.indexOf(id)).not.toBe(-1)
        })
        expect(flipped.length).toBe(3)
      })

      it('calculates number of flipped cards when there are none', () => {
        state.board.forEach(row => {
          row.forEach(card => card.flipped = false)
        })

        expect(getters.flipped(state).length).toBe(0) 
      })

      it('calculates number of flipped cards when all are flipped', () => {
        state.board.forEach(row => {
          row.forEach(card => card.flipped = true)
        })

        const flipped = getters.flipped(state)
        const flippedIds = flipped.map(c => c.id)
        const expectedIds = ['0-0', '0-1',
                             '1-0', '1-1',
                             '2-0', '2-1']

        expect(flipped.length).toBe(6)
        expectedIds.forEach(id => {
          expect(flippedIds.indexOf(id)).not.toBe(-1)
        })
      })
    })

    describe('unmatched', () => {
      it('calculates number of unmatched card', () => {
        state.matched = 2
        expect(getters.unmatched(state)).toBe(4) 

        state.matched = 4
        expect(getters.unmatched(state)).toBe(2)
      })

      it('calculates number of unmatched when there are none', () => {
        state.matched = 6
        expect(getters.unmatched(state)).toBe(0) 
      })

      it('calculates number of unmatched when thre are no matched', () => {
        state.matched = 0
        expect(getters.unmatched(state)).toBe(6) 
      })
    })
  })
})