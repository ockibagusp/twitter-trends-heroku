import { describe, it, expect, assert } from 'vitest'

import { mount } from '@vue/test-utils'
import CopydanPaste from '../CopydanPaste.vue'

describe('Copy dan Paste', () => {
  expect(CopydanPaste).toBeTruthy()

  const wrapper = mount(CopydanPaste, {
    props: { } 
  })

  it('Copy dan Paste init', async() => {
    const copydanpaste = wrapper.find('[data-test="copydanpaste"]')
    copydanpaste.setValue(`
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
© 2022 Twitter, Inc.`)

    assert.isDefined(copydanpaste.element.value)

    await copydanpaste.trigger('change')
    
    const hasil = wrapper.find('[data-test="hasil"]')
    assert.equal(
      hasil.element.value,
      'Tags: (Indonesia) Menpan RB, (Indonesia) #TimnasIndonesia, (Indonesia) Yayasan Aksi Cepat Tanggap, (Inggris) Menpan RB, (Inggris) #TimnasIndonesia, (Inggris) Yayasan Aksi Cepat Tanggap'
    )
  })

  it('button reset', async() => {
    const copydanpaste = wrapper.find('[data-test="copydanpaste"]')
    copydanpaste.setValue('-')
    const hasil = wrapper.find('[data-test="hasil"]')
    hasil.setValue('Tidak ada hasil')

    assert.equal(copydanpaste.element.value, '-')
    assert.equal(hasil.element.value, 'Tidak ada hasil')

    await wrapper.get('[data-test="btnReset"]').trigger('click')
    assert.equal(copydanpaste.element.value, '')
    assert.equal(hasil.element.value, '')

    // copydanpaste.element.fac
  })
})
