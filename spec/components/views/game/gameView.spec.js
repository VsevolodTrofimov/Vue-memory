import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'

import GameVeiw from '@/src/components/views/Game/Game.vue'


const VSSR = createRenderer()
const localVue = createLocalVue()
localVue.config.productionTip = false
localVue.use(Vuex)

describe('Views', () => {
  describe('Game View', () => {
    let stubStore
    const cards = []
    const actions = {}

    beforeEach(() => {
      Object.assign(actions, {
        flipCard: jest.fn(),
        restartGame: jest.fn()
      })

      cards.length = 0
      for(let i = 0; i < 6; ++i) {
        cards.push({
          id: i,
          path: '/static/card/' + i.toString()
        })
      }

      stubStore = new Vuex.Store({
        state: {},
        getters: {
          board: () => [cards.slice(0, cards.length/2), cards.slice(cards.length/2)],
          score: () => 10
        },
        actions
      })
    })

    it('matches snapshot', () => {
      const wrapper = mount(GameVeiw, {store: stubStore, localVue})

      VSSR.renderToString(wrapper.vm, (err, str) => {
        expect(str).toMatchSnapshot()
      })
    })

    it('displays board', () => {
      const wrapper = mount(GameVeiw, {store: stubStore, localVue})
      const cards = wrapper.findAll('[data-tid^="Card"]')

      expect(cards.length).toBe(cards.length)
    })

    it('displays score from store', () => {
      const wrapper = mount(GameVeiw, {store: stubStore, localVue})
      const scoreNode = wrapper.find('[data-tid="Menu-scores"]')
      
      expect(parseInt(scoreNode.text())).toEqual(stubStore.getters.score)
    })

    it('dispatches restartGame action on Menu-newGame click', () => {
      const wrapper = mount(GameVeiw, {store: stubStore, localVue})
      wrapper.find('[data-tid="Menu-newGame"]').trigger('click')
      
      expect(actions.restartGame).toBeCalled()
    })

    it('dispatches flipCard action on card click', () => {
      const wrapper = mount(GameVeiw, {store: stubStore, localVue})
      wrapper.find('[data-tid^="Card"]').trigger('click')
      
      expect(actions.flipCard).toBeCalled()
      expect(actions.flipCard.mock.calls[0][1]).toBe(cards[0])
    })
  })
})