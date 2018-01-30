import testAction from '@/spec/test-utilities/testAction.js'

import config from '@/src/utility/gameConfig'
import * as actions from '@/src/store/actions.js'


describe('Store Actions', () => {  
  describe('Start game', () => {
    it('Calls everyhting to start game when deck is loaded', () => {
      testAction(actions.startGame, null, {
        mutations: [
          'fillBoard',
          ['setScore', 0],
          ['setMatched', 0],
          'showAllCards',
          ['setStage', 'game'],
        ],
        actions: [
          ['commitDelayed', {
            mutation: 'maskAllCards',
            delay: config.initialVisibleTime,
            id: 'startGame-1'
          }]
        ]
      }, {
        getters: {deck: {loaded: true}}
      })
    })

    it('Sets game to loading and waits for deck load to try again', done => {
      testAction(actions.startGame, null, {
        mutations: [
          ['setStage', 'loading'],
        ],
        actions: ['startGame']
      }, {
        getters: {
          deck: {
            loading: Promise.resolve()
          }
        }
      }, done)

      testAction(actions.startGame, null, {
        mutations: [
          ['setStage', 'loading'],
        ],
      }, {
        getters: {
          deck: {
            loading: Promise.reject()
          }
        }
      }, done)
    })
    
  })

  describe('Restart game', () => {
    it('Starts new game', () => {
      testAction(actions.restartGame, null, {
        actions: ['startGame'],
      })
    })
  })

  describe('End game', () => {
    it('Sets stage to end', () => {
      testAction(actions.endGame, null, {
        mutations: [
          ['setStage', 'end'],
        ]
      })
    })
  })
})
