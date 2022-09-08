import { describe, it, assert, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CopydanPaste from '../CopydanPaste.vue'

describe('Copy dan Paste', () => {
  assert.exists(CopydanPaste)

  const wrapper = mount(CopydanPaste, {
    props: { } 
  })

  // textarea: copydanpaste dan hasil
  const copydanpaste = wrapper.find('[data-test="copydanpaste"]')
  const hasil = wrapper.find('[data-test="hasil"]')

  // button: btnReset dan btnCopy
  const btnReset = wrapper.find('[data-test="btnReset"]') 
  const btnCopy = wrapper.find('[data-test="btnCopy"]')

  // button: btnTweet
  const btnTweet = wrapper.find('[data-test="btnTweet"]')

  it('init', () => {
    assert.isEmpty(copydanpaste.element.value)
    // TODO: copydanpaste.element.focus() => undefined. Why?
    assert.equal(copydanpaste.element.focus(), undefined)

    assert.isEmpty(hasil.element.value)

    assert.isUndefined(btnReset.attributes().disabled)
    assert.equal(btnCopy.attributes().disabled, '')
  })  

  it('lingkaran dari `for`', async() => {
    // test cases
    const testCases = [
      { 
        copydanpaste:`
...
>>> Indonesia

Sedang tren dalam topik Indonesia
(Indonesia) Menpan RB
Olahraga · Populer
(Indonesia) #TimnasIndonesia
2.233 rb Tweet
Sedang tren dalam topik Indonesia
(Indonesia) Yayasan Aksi Cepat Tanggap
1.660 Tweet

>>> Inggris
Trending in Indonesia
(Inggris) Menpan RB
Trending in Indonesia
(Inggris) #TimnasIndonesia
10.9K Tweets
Entertainment · Trending
(Inggris) Yayasan Aksi Cepat Tanggap
54.5 Tweets
`, 
        hasil: 'Tags: (Indonesia) Menpan RB, (Indonesia) #TimnasIndonesia, (Indonesia) Yayasan Aksi Cepat Tanggap, (Inggris) Menpan RB, (Inggris) #TimnasIndonesia, (Inggris) Yayasan Aksi Cepat Tanggap',
        tweetIs: 'Tweet is: 96',
        bntCopyDanTweet: true
      },
      {
        copydanpaste: '-',
        hasil: 'Tidak ada hasil',
        tweetIs: 'Tweet is: 280',
        bntCopyDanTweet: false
      },
      {
        copydanpaste: '',
        hasil: '',
        tweetIs: 'Tweet is: 280',
        bntCopyDanTweet: false
      }
    ]

    for (let test of testCases) {
      copydanpaste.setValue(test.copydanpaste)

      assert.equal(test.copydanpaste, copydanpaste.element.value)

      await copydanpaste.trigger('change')

      assert.equal(
        hasil.element.value,
        test.hasil
      )

      assert.equal(btnTweet.text(), test.tweetIs)

      if (test.bntCopyDanTweet) {
        // button: bntCopy dan bntTweet diaktifkan
        assert.isUndefined(btnCopy.attributes().disabled)
        assert.isUndefined(btnTweet.attributes().disabled)
      } else {
        // button: bntCopy dan bntTweet dinonaktifkan
        assert.equal(btnCopy.attributes().disabled, '')
        assert.equal(btnTweet.attributes().disabled, '')
      }
    }
  })

  it('button reset', async() => {
    // 1. textarea: copydanpaste = '-'
    // 2. textarea: hasil = 'Tidak ada hasil'
    copydanpaste.setValue('-')
    hasil.setValue('Tidak ada hasil')

    assert.equal(copydanpaste.element.value, '-')
    assert.equal(hasil.element.value, 'Tidak ada hasil')

    await btnReset.trigger('click')
    assert.equal(copydanpaste.element.value, '')
    assert.equal(hasil.element.value, '')
  })
})

// TDD
// ✅ ❎
// 1. textarea `hasil` untuk array untuk trends ❎
// 2. textarea `tweet` ini diaktifkan, jika maks. 280 karakter 
// 3. textarea `copy` ini diaktifkan dan textarea `tweet` jika ini dinonaktifkan
describe('Tweet', () => {
  assert.exists(CopydanPaste)

  const wrapper = mount(CopydanPaste, {
    props: { },
    data() {
      return {
        arraytrends: [
          {
            text: "#TimnasIndonesia",
            completed: true
          },
          {
            text: "Test 1",
            completed: true
          },
          {
            text: "Test 2",
            completed: true
          }
        ],
      }
    } 
  })

  // array untuk trends
  const arrayTrends = wrapper.findAll('[data-test="arrayTrends"]')

  it('textarea `hasil` untuk array untuk trends', async() => {
    // arrayTrends: '[0] => #TimnasIndonesia, [1] => Test 1, [2] => Test 2'
    for (let i = 0; i < arrayTrends.length; i++) {
      assert.deepEqual(arrayTrends.at(i).classes(), ['completed' ], `ke-${i}`)
    }

    expect(arrayTrends).toHaveLength(3)
  })
})