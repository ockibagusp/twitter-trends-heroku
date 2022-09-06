import { describe, it, assert } from 'vitest'

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
        bntCopyDanTweet: true
      },
      {
        copydanpaste: '-',
        hasil: 'Tidak ada hasil',
        bntCopyDanTweet: false
      },
      {
        copydanpaste: '',
        hasil: '',
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
// 1. web awal dalam textarea `hasil` sama textarea `tweet` ini dinonaktifkan ✅
// 2. textarea `hasil` benar maka array untuk trends, tidak benar maka 'Tidak ada hasil'
// 3. textarea `tweet` ini diaktifkan, jika maks. 140 karakter ❎
// 4. textarea `copy` ini diaktifkan dan textarea `tweet` jika ini dinonaktifkan
describe('Tweet', () => {
  assert.exists(CopydanPaste)

  const wrapper = mount(CopydanPaste, {
    props: { } 
  })

  // textarea: copydanpaste dan hasil
  const copydanpaste = wrapper.find('[data-test="copydanpaste"]')
  const hasil = wrapper.find('[data-test="hasil"]')

  // button: btnCopy dan btnTweet
  const btnCopy = wrapper.find('[data-test="btnCopy"]')
  const btnTweet = wrapper.find('[data-test="btnTweet"]')

  // array untuk trends
  const arrayTrends = wrapper.find('[data-test="arrayTrends"]')

  it('web awal dalam textarea `hasil` sama textarea `tweet` ini dinonaktifkan', () => {
    assert.equal(btnCopy.attributes().disabled, '')
    assert.equal(btnTweet.attributes().disabled, '')
  })

  it('textarea `hasil` benar maka array untuk trends, tidak benar maka \'Tidak ada hasil\'', () => {
    // ?
  })

  it('min. dan maks. 280 karakter', async() => {
    // test cases
    const testCases = [
      { 
        copydanpaste:`
...
Olahraga · Populer
(Indonesia) #TimnasIndonesia
2.233 rb Tweet
...
        `,
        text: 'Tweet is: 246'        
      },
      {
        copydanpaste:`
...
Trending in Indonesia
Lorem ipsum dolor sit amet
1.23 rb Tweet
Trending in Indonesia
consectetur adipiscing elit
Trending in Indonesia
Donec id luctus metus
Trending in Indonesia
Quisque semper condimentum metus sed imperdiet
Trending in Indonesia
#Donec eget ullamcorper velit
Trending in Indonesia
Maecenas lacinia
1.23 rb Tweet
Trending in Indonesia
urna sit amet egestas aliquet
Trending in Indonesia
eros elit egestas nulla
Trending in Indonesia
a sollicitudin tortor lectus ut urna
Trending in Indonesia
Duis sagittis mattis mauris
...
        `,
        text: 'Tweet is: -24'
      },
      {
        copydanpaste: '-',
        text: 'Tweet is: 280'
      }
    ]

    for (let test of testCases) {
      copydanpaste.setValue(test.copydanpaste)
      await copydanpaste.trigger('change')
      
      assert.equal(btnTweet.text(), test.text)     
    }
  })
})