import {snapAction, useMockPromise, useRealPromise, resetTimetable} from 'vuex-snapshot'

import * as actions from '@/src/store/actions.js'
import config from '@/src/utility/gameConfig'

describe('Actions', () => {
  describe('Utility actions', () => {
    describe('Load deck', () => {
      const configRealOptions = config.cards.options

      beforeEach(() => {
        config.cards.options = ['/static/card1.png', '/static/card2.png']
        useMockPromise()
        resetTimetable()
      })

      afterEach(() => {
        useRealPromise()
      })
      
      afterAll(() => {
        config.cards.options = configRealOptions
      })

      it('Matches "good loading" snapshot', async done => {
        const run = await snapAction(actions.loadDeck, ['Promise', 'Promise'])
        expect(run).toMatchSnapshot()
        done()
      })

      it('Matches "network error" snapshot', async done => {
        const resolutions = ['Promise', {name: 'Promise', type: 'reject', payload: 403}]
        
        const run = await snapAction(actions.loadDeck, resolutions)
        expect(run).toMatchSnapshot()
        done()
      })
    })


    describe('Commit Delayed', () => {
      it('Matches snapshot', () => {
        const commit = jest.fn((mutation, payload) => {
          if(payload.cb) payload.cb()
        })
        const mutation = 'sample', payload = 'samplePayload'

        expect(snapAction(actions.commitDelayed, {
          payload: {
            delay: 150,
            id: 'test-1',
            mutation, payload
          },
          commit
        })).toMatchSnapshot()

        expect(commit.mock.calls.map(c => c.slice(0, 2))).toMatchSnapshot()
      })

      it('Warns about not using id', () => {
        const realWarn = console.warn
        console.warn = jest.fn()
        
        actions.commitDelayed({commit: jest.fn()}, {})
        expect(console.warn).toBeCalled()

        console.warn = realWarn
      })
    })
  })
})