// Import the mount() method from the test utils
// and the component you want to test
import { mount, createLocalVue } from '@vue/test-utils'
import Input from '../src/tab-complete-input'

describe('Vue Tab Complete Input', () => {
  it('has an input', () => {
    const wrapper = mount(Input)
    expect(wrapper.contains('input')).toBe(true)
  })

  it('should accept an array of names and populate a trie', () => {
    const wrapper = mount(Input)
    wrapper.setProps({ dataSource: ['John', 'Jake'] })

    expect(wrapper.vm.trie.contains('Jake')).toBe(true)
  })

  it.skip('should successfully tab complete a static array', () => {
    const localVue = createLocalVue()

    localVue.component('tab-complete-input', Input)

    const wrapper = mount(
      {
        template: `<tab-complete-input ref="input" v-model="text" :data-source="list" />`,
        data() {
          return {
            list: ['John', 'Jake'],
            text: 'J'
          }
        }
      },
      { localVue }
    )
    const input = wrapper.find({ ref: 'input' })

    input.setValue('J')

    input.vm.selectRange(1, 1)

    input.trigger('keydown', {
      keyCode: 9
    })

    expect(input.vm.localValue).toBe('Jake')
  })
})
