import { mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'

import coreHeading from '@/src/components/core/Heading/Heading.vue'


const VSSR = createRenderer()
const localVue = createLocalVue()
localVue.config.productionTip = false


describe('Components', () => {
  describe('Core Heading', () => {
    it('matches snapshot', () => {
      const wrapper = mount(coreHeading)

      VSSR.renderToString(wrapper.vm, (err, str) => {
        expect(str).toMatchSnapshot()
      })
    })

    it('changes level', () => {
      const wrapper =  mount(coreHeading, {
        propsData: {level: 1}
      })

      expect(wrapper.contains('h1')).toBe(true)
    })
  })
})
