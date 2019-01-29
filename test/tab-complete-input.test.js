// Import the mount() method from the test utils
// and the component you want to test
import { mount } from '@vue/test-utils'
import Input from '../src/tab-complete-input'

describe('Vue Tab Complete Input', () => {
  it('has an input', () => {
    const wrapper = mount(Input)
    expect(wrapper.contains('input')).toBe(true)
  })
})
