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
    // TODO: btnSubmit.attributes() => { 'data-test': 'btnSubmit' }
    assert.equal(btnSubmit.attributes().disabled, undefined)

    // textarea hasil: test getdaytrends.com
    assert.equal(hasil.element.value, 'Tags: #TimnasIndonesia')
    assert.equal(btnCopy.attributes().disabled, undefined)
  })  

  it.todo('lingkaran dari `for`')
})
