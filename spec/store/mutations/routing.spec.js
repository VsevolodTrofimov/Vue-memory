import * as mutations from '@/src/store/mutations.js'

describe('Mutations', () => {
  describe('Game', () => {
    const state = {}
    beforeEach(() => {
      Object.assign(state, {
        stage: 'Start'
      })
    })

    describe('setStage', () => {
      it('Changes stage', () => {
        mutations.setStage(state, 'End')
        expect(state.stage).toBe('End')

        mutations.setStage(state, 'Game')
        expect(state.stage).toBe('Game')
      })
    })
  })
})