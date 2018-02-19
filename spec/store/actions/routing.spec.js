import {snapAction, MockPromise, resetTimetable} from 'vuex-snapshot'

import * as actions from '@/src/store/actions.js'

describe('Actions', () => {
  describe('Store routing actions', () => {
    beforeEach(resetTimetable)
  
    describe('Start game', () => {
      it('Matches "deck loded" snapshot', () => {
        const getters = {
          deck: {loaded: true}
        }
        expect(snapAction(actions.startGame, {getters})).toMatchSnapshot()
      })
  
      it('Matches "waiting for deck to load" snapshot', async done => {
        const getters = {
          deck: {
            loaded: false,
            loading: new MockPromise('deck load')
          }
        }
  
        const run = await snapAction(actions.startGame, {getters}, ['deck load'])
        expect(run).toMatchSnapshot()
        done()
      })
    })
  
    describe('Restart game', () => {
      it('Matches snapshot', () => {
        expect(snapAction(actions.restartGame)).toMatchSnapshot()
      })
    })
  
    describe('End game', () => {
      it('Matches snapshot', () => {
        expect(snapAction(actions.endGame)).toMatchSnapshot()
      })
    })
  })
})
