import { describe, it, assert, expect, vi } from 'vitest'

import { mount, flushPromises } from '@vue/test-utils'
import  GetDayTrends from '../GetDayTrends.vue'

import axios from 'axios'

// test html: https://getdaytrends.com/indonesia/bekasi/
const mockGetDayTrends = { 
  data: '<td class="main"><a href="/indonesia/bekasi/trend/%23TimnasIndonesia/">#TimnasIndonesia</a><div class="desc"><span class="small text-muted">22.1K tweets</span></div></td>' +
    '<td class="main"><a href="/indonesia/bekasi/trend/Test%201/">Test 1</a><div class="desc"><span class="small text-muted">Under 10K tweets</span></div></td>' +
    '<td class="main"><a class="string" href="/indonesia/bekasi/trend/%23Test2/">#Test2</a><div class="desc"><span class="small text-muted">53.9K tweets</span></div></td>' +
    '<td class="main"><a class="string" href="/indonesia/bekasi/trend/Test%203/">Test 3</a><div class="desc"><span class="small text-muted">54.5K tweets</span></div></td>'

}

// GET
vi.spyOn(axios, 'get').mockResolvedValueOnce(mockGetDayTrends)

// TDD
// ✅ ❎
// 1. textarea `hasil` untuk array untuk trends ✅
// 2. kotak centang untuk trends di getdaytrends.com ✅
// 3. button `semua kotak centang` jika ini diaktifkan atau tidak diaktifkan ❎
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
            name: 'Test 1',
            tweetVolume: 'Under 10K tweets',
            completed: true
          },
          {
            name: '#Test2',
            tweetVolume: '53.9K tweets',
            completed: true
          },
          {
            name: 'Test 3',
            tweetVolume: '54.5K tweets',
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
    assert.equal(hasil.element.value, 'Tags: #TimnasIndonesia, Test 1, #Test2, Test 3')
    // button: btnCopy diaktifkan
    assert.isUndefined(btnCopy.attributes().disabled)
  })

  // array dan checkbox untuk trends
  const arrayTrends = wrapper.findAll('[data-test="array-trends"]')
  const checkboxTrends = wrapper.findAll('[data-test="trends-checkbox"]')


  it('kotak centang untuk trends di getdaytrends.com: baru', async => {
    for (let i = 0; i < arrayTrends.length; i++) {
      expect(arrayTrends.at(i).classes()).toContain('completed')
    }
  })

  it('kotak centang untuk trends di getdaytrends.com: tidak dicentang', async() => {
    assert.equal(hasil.element.value, 'Tags: #TimnasIndonesia, Test 1, #Test2, Test 3')

    // test cases
    const testCases = [
      {
        name: '#TimnasIndonesia',
        index: 0,
        listBool: [false, true, true, true],
        hasil: 'Tags: Test 1, #Test2, Test 3',
      },
      {
        name: 'Test 1',
        index: 1,
        listBool: [false, false, true, true],
        hasil: 'Tags: #Test2, Test 3',
      },
      {
        name: '#Test2',
        index: 2,
        listBool: [false, false, false, true],
        hasil: 'Tags: Test 3',
      },
      {
        name: 'Test 3',
        index: 3,
        listBool: [false, false, false, false],
        hasil: 'Tidak ada hasil',
      },
    ]

    for (let test of testCases) {
      console.debug('unchecked ke-', test.name)
      await checkboxTrends.at(test.index).setValue(false)
      
      for (let i = 0; i < test.listBool.length; i++) {
        if (test.listBool[i]) {
          expect(arrayTrends.at(i).classes()).toContain('completed')
        } else {
          // same: assert.deepEqual(arrayTrends.at(...).classes(), [])
          expect(arrayTrends.at(i).classes()).to.deep.equal([])
        }
      }

      assert.equal(hasil.element.value, test.hasil)
    }
  })

  it('kotak centang untuk trends di getdaytrends.com: dicentang', async() => {
    console.debug('-----')

    assert.equal(hasil.element.value, 'Tidak ada hasil')

    // test cases
    const testCases = [   
      {
        name: 'Test 1',
        index: 1,
        listBool: [false, true, false, false],
        hasil: 'Tags: Test 1',
      },
      {
        name: 'Test 3',
        index: 3,
        listBool: [false, true, false, true],
        hasil: 'Tags: Test 1, Test 3',
      },
      {
        name: '#TimnasIndonesia',
        index: 0,
        listBool: [true, true, false, true],
        hasil: 'Tags: #TimnasIndonesia, Test 1, Test 3',
      },
      {
        name: '#Test2',
        index: 2,
        listBool: [true, true, true, true],
        hasil: 'Tags: #TimnasIndonesia, Test 1, #Test2, Test 3',
      }  
    ]

    for (let test of testCases) {
      console.debug('checked ke-', test.name)
      await checkboxTrends.at(test.index).setValue(true)
      
      for (let i = 0; i < test.listBool.length; i++) {
        if (test.listBool[i]) {
          expect(arrayTrends.at(i).classes()).toContain('completed')
        } else {
          // same: assert.deepEqual(arrayTrends.at(...).classes(), [])
          expect(arrayTrends.at(i).classes()).to.deep.equal([])
        }
      }

      assert.equal(hasil.element.value, test.hasil)
    }
  })
})
