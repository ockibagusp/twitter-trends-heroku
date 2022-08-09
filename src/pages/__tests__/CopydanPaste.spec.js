import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CopydanPaste from '../CopydanPaste.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(CopydanPaste, { props: {  } })
    expect(wrapper.text()).toContain('twitter.com/i/trends + Select All')
  })
})
