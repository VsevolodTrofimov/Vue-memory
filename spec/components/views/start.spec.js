import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'

import StartVeiw from '@/src/components/views/Start/Start.vue'


const VSSR = createRenderer()
const localVue = createLocalVue()
localVue.config.productionTip = false
localVue.use(Vuex)

describe('Views', () => {
  describe('Start View', () => {
    let actions
    let stubStore
    let stage

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

    it('matches snapshot', () => {
      const wrapper = mount(StartVeiw, {store: stubStore, localVue})

      VSSR.renderToString(wrapper.vm, (err, str) => {
        expect(str).toMatchSnapshot()
      })
    })
    
    it('dispatches startGame action', () => {
      const wrapper = mount(StartVeiw, {store: stubStore, localVue})
      wrapper.find('[data-tid="NewGame-startGame"]').trigger('click')

      expect(actions.startGame).toBeCalled()
    })

    it('dispatches loadDeck action', () => {
      const wrapper = mount(StartVeiw, {store: stubStore, localVue})
      wrapper.find('[data-tid="NewGame-startGame"]').trigger('click')

      expect(actions.loadDeck).toBeCalled()
    })

    it('matches "loading" snapshot', () => {
      stage = 'loading'

      const vm = new localVue({
        store: stubStore,
        render: h => h(StartVeiw)
      })

      VSSR.renderToString(vm, (err, str) => {
        expect(str).toMatchSnapshot()
      })
    })
  })
})