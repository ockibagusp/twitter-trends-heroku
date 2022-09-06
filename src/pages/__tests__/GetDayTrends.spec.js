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
    // button: btnSubmit diaktifkan
    assert.isUndefined(btnSubmit.attributes().disabled)

    // textarea hasil: test getdaytrends.com
    assert.equal(hasil.element.value, 'Tags: #TimnasIndonesia')
    // button: btnCopy diaktifkan
    assert.isUndefined(btnCopy.attributes().disabled)
  })  

  it.todo('lingkaran dari `for`')
})
