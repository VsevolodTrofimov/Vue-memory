import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'

import StartVeiw from '@/src/components/views/Start/Start.vue'


const VSSR = createRenderer()
const localVue = createLocalVue()
localVue.config.productionTip = false
localVue.use(Vuex)

const realTimeout = setTimeout
jest.useFakeTimers()


describe('Views', () => {
  describe('Start View', () => {
    let actions
    let stubStore
    let stage
    let wrapper

    beforeEach(() => {
      stage = 'start'

      actions = {
        startGame: jest.fn(),
        loadDeck: jest.fn()
      }
      
      stubStore = new Vuex.Store({
        state: {},
        getters: {
          stage: () => {
            return stage
          }
        },
        actions
      })
    })

    afterEach(() => {
      wrapper.destroy()
      jest.runAllTimers()
    })

    it('matches snapshot', () => {
      wrapper = mount(StartVeiw, {store: stubStore, localVue})

      VSSR.renderToString(wrapper.vm, (err, str) => {
        expect(str).toMatchSnapshot()
      })
    })
    
    it('dispatches startGame action', () => {
      wrapper = mount(StartVeiw, {store: stubStore, localVue})
      wrapper.find('[data-tid="NewGame-startGame"]').trigger('click')

      expect(actions.startGame).toBeCalled()
    })

    it('dispatches loadDeck action', () => {
      wrapper = mount(StartVeiw, {store: stubStore, localVue})
      wrapper.find('[data-tid="NewGame-startGame"]').trigger('click')

      expect(actions.loadDeck).toBeCalled()
    })

    it('matches "loading" snapshot', () => {
      stage = 'loading'
      wrapper = mount(StartVeiw, {store: stubStore, localVue})

      VSSR.renderToString(wrapper.vm, (err, str) => {
        expect(str).toMatchSnapshot()
      })
    })

    it('retries loadDeck when it fails', done => {
      actions.loadDeck.mockReturnValue(Promise.reject())
      const realerror = console.error
      console.error = jest.fn()

      done()

      wrapper = mount(StartVeiw, {store: stubStore, localVue})
      wrapper.find('[data-tid="NewGame-startGame"]').trigger('click')

      Promise.resolve().then(() => {
        // idling 1 tick
        realTimeout(() => {
          expect(console.error).toBeCalled()
          expect(actions.loadDeck).toBeCalled()
          expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
          jest.advanceTimersByTime(1000)
    
          expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000)
  
          console.error = realerror
          done()
        }, 0)
      })
    })
  })
})