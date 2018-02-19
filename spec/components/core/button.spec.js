import { mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'

import coreButton from '@/src/components/core/Button/Button.vue'


const VSSR = createRenderer()
const localVue = createLocalVue()
localVue.config.productionTip = false


describe('Components', () => {
  describe('Core Button', () => {
    it('matches snapshot', () => {
      const wrapper = mount(coreButton, {
        slots: {
          default: 'Button text'
        }
      })

      VSSR.renderToString(wrapper.vm, (err, str) => {
        expect(str).toMatchSnapshot()
      })
    })

    it('emits click', () => {
      const wrapper =  mount(coreButton)

      wrapper.trigger('click')

      expect(wrapper.emitted().click.length).toBe(1)
    })
  })
})