import { describe, it, assert } from 'vitest'

import { mount } from '@vue/test-utils'
import  GetDayTrends from '../GetDayTrends.vue'

describe('getdaytrends.com', () => {
  assert.exists(GetDayTrends)

  const wrapper = mount(GetDayTrends, {
    props: { } 
  })

  // button: btnSubmit
  const btnSubmit = wrapper.find('[data-test="btnSubmit"]')
  
  // textarea: hasil
  const hasil = wrapper.find('[data-test="hasil"]')

  // button: btnCopy
  const btnCopy = wrapper.find('[data-test="btnCopy"]')

  it('init', () => {
    assert.equal(btnSubmit.attributes().disabled, '')

    // textarea hasil: loading...
    assert.equal(hasil.element.value, 'Loading...')
    assert.equal(btnCopy.attributes().disabled, '')
  })  

  it.todo('lingkaran dari `for`')
})
