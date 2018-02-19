import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'

import EndVeiw from '@/src/components/views/End/End.vue'


const VSSR = createRenderer()
const localVue = createLocalVue()
localVue.config.productionTip = false
localVue.use(Vuex)

describe('Views', () => {
  describe('End View', () => {
    let actions
    let stubStore

    beforeEach(() => {
      actions = {
        startGame: jest.fn()
      }

      stubStore = new Vuex.Store({
        state: {},
        getters: {
          score: () => 10
        },
        actions
      })
    })

    it('matches snapshot', () => {
      const vm = new localVue({
        store: stubStore,
        render: h => h(EndVeiw)
      })

      VSSR.renderToString(vm, (err, str) => {
        expect(str).toMatchSnapshot()
      })
    })

    it('displays score from store', () => {
      const wrapper = mount(EndVeiw, {store: stubStore, localVue})
      const scoreNode = wrapper.find('[data-tid="EndGame-finalScore"]')
      expect(parseInt(scoreNode.text())).toEqual(stubStore.getters.score)
    })

    it('dispatches startGame action', () => {
      const wrapper = mount(EndVeiw, {store: stubStore, localVue})
      wrapper.find('[data-tid="EndGame-retryGame"]').trigger('click')
      expect(actions.startGame).toBeCalled()
    })
  })
})