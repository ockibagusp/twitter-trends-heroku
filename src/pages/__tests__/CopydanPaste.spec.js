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
Untuk melihat pintasan papan ketik, tekan tanda tanya
Lihat pintasan papan ketik
Pesan
Tren
Lihat Tweet baru
Tren

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

Untuk diikuti
Patlikur_01
@sofyansyah_oi
Mengikuti Anda
Wonder of Science
@wonderofscience
Inspirasi Islami
@inspirasiislami
Tampilkan lebih banyak
Persyaratan Layanan
Kebijakan Privasi
Kebijakan Penggunaan Kuki
Aksesibilitas
Informasi iklan
Lainnya
© 2022 Twitter, Inc.`, 
        hasil: 'Tags: (Indonesia) Menpan RB, (Indonesia) #TimnasIndonesia, (Indonesia) Yayasan Aksi Cepat Tanggap, (Inggris) Menpan RB, (Inggris) #TimnasIndonesia, (Inggris) Yayasan Aksi Cepat Tanggap'
      },
      {
        copydanpaste: '-',
        hasil: 'Tidak ada hasil'
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
    }
  })

  it('button reset', async() => {
    // 1. textarea: copydanpaste = '-'
    // 2. textarea: hasil = 'Tidak ada hasil'

    assert.equal(copydanpaste.element.value, '-')
    assert.equal(hasil.element.value, 'Tidak ada hasil')

    await btnReset.trigger('click')
    assert.equal(copydanpaste.element.value, '')
    assert.equal(hasil.element.value, '')
  })
})

// TDD
// 1. web awal dalam textarea `hasil` sama textarea `tweet` ini dinonaktifkan ✅
// 2. textarea `tweet` ini diaktifkan, jika maks. 140 karakter ❎
// 3. textarea `copy` ini diaktifkan dan textarea `tweet` jika ini dinonaktifkan
describe('Tweet', () => {
  assert.exists(CopydanPaste)

  const wrapper = mount(CopydanPaste, {
    props: { } 
  })

  // textarea: copydanpaste dan hasil
  const hasil = wrapper.find('[data-test="hasil"]')

  // button: btnCopy dan btnTweet
  const btnCopy = wrapper.find('[data-test="btnCopy"]')
  const btnTweet = wrapper.find('[data-test="btnTweet"]')

  it('init', () => {
    assert.equal(btnCopy.attributes().disabled, '')
    assert.equal(btnTweet.attributes().disabled, '')
  })

  it('min. dan maks. 140 karakter', () => {
    // min. 140 karakter.
    // bool: true
    hasil.setValue('Tags: #TimnasIndonesia')
    assert.equal(
      hasil.element.value,
      'Tags: #TimnasIndonesia'
    )
    // Maks. 150 karakter.
    // bool: false
    hasil.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat volutpat arcu, in condimentum dolor vehicula vitae. Fusce ullamcorper ex tortor, a porta augue luctus vitae. Praesent ac molestie neque. Sed laoreet ante id mi elementum aliquet. Morbi eget dolor est. Maks. 150 karakter.')
    assert.equal(
      hasil.element.value,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat volutpat arcu, in condimentum dolor vehicula vitae. Fusce ullamcorper ex tortor, a porta augue luctus vitae. Praesent ac molestie neque. Sed laoreet ante id mi elementum aliquet. Morbi eget dolor est. Maks. 150 karakter.'
    )
  })
})