import { describe, it, assert, expect, vi } from 'vitest'

import { mount, flushPromises } from '@vue/test-utils'
import  GetDayTrends from '../GetDayTrends.vue'

import axios from 'axios'

// test html: https://getdaytrends.com/indonesia/bekasi/
const mockGetDayTrends = { 
  data: '<td class="main"><a href="/indonesia/bekasi/trend/%23TimnasIndonesia/">#TimnasIndonesia</a><div class="desc"><span class="small text-muted">22.1K tweets</span></div></td>' +
    '<td class="main"><a href="/indonesia/bekasi/trend/%23TambahLokalTambahBangga/">#TambahLokalTambahBangga</a><div class="desc"><span class="small text-muted">Under 10K tweets</span></div></td>' +
    '<td class="main"><a class="string" href="/indonesia/bekasi/trend/Dirgahayu%20Republik%20Indonesia/">Dirgahayu Republik Indonesia</a><div class="desc"><span class="small text-muted">53.9K tweets</span></div></td>'
}

// GET
vi.spyOn(axios, 'get').mockResolvedValueOnce(mockGetDayTrends)

// TDD
// ✅ ❎
// 1. textarea `hasil` untuk array untuk trends ✅
// 2. kotak centang untuk trends di getdaytrends.com ❎
describe('getdaytrends.com', async() => {
  assert.exists(GetDayTrends)

  const wrapper = mount(GetDayTrends, {
    props: { },
    data() {
      return {
        arraytrends: [
          {
            name: '#TimnasIndonesia',
            tweetVolume: '22.1K tweets',
            completed: true
          },
          {
            name: '#TambahLokalTambahBangga',
            tweetVolume: 'Under 10K tweets',
            completed: true
          },
          {
            name: 'Dirgahayu Republik Indonesia',
            tweetVolume: '53.9K tweets',
            completed: true
          },
        ]
      }
    }
  })

  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenCalledWith('/twitter-trends/url')

  // Wait until the DOM updates.
  await flushPromises()

  // button: btnSubmit
  const btnSubmit = wrapper.find('[data-test="btn-submit"]')
  
  // textarea: hasil
  const hasil = wrapper.find('[data-test="hasil"]')

  // button: btnCopy
  const btnCopy = wrapper.find('[data-test="btn-copy"]')

  it('init', async() => {
    // button: btnSubmit diaktifkan
    assert.isUndefined(btnSubmit.attributes().disabled)

    // textarea hasil: test getdaytrends.com
    assert.equal(hasil.element.value, 'Tags: #TimnasIndonesia, #TambahLokalTambahBangga, Dirgahayu Republik Indonesia')
    // button: btnCopy diaktifkan
    assert.isUndefined(btnCopy.attributes().disabled)
  })

  // array untuk trends
  const arrayTrends = wrapper.findAll('[data-test="array-trends"]')

  it('kotak centang untuk trends di getdaytrends.com: baru', async => {
    for (let i = 0; i < arrayTrends.length; i++) {
      expect(arrayTrends.at(i).classes()).toContain('completed')
    }
  })

  it('kotak centang untuk trends di getdaytrends.com: tidak dicentang', async => {

  })

  it('kotak centang untuk trends di getdaytrends.com: dicentang', async => {

  })
})
