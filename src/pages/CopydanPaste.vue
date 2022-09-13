<script>
export default {
  data() {
    return {
      // textarea: copydanpaste dan hasil
      copydanpaste: '',
      hasil: '',

      // array untuk trends
      arraytrends: [],
      arraytrendstext: [],

      // tweet dihasil maks. 280 karakter
      count: 280,

      // pilih hasil dan button copy: true atau false
      selectHasil: false,
      selectCopy: false,
      selectTweet: false
    }
  },
  computed: {
    // adalah hasil dan button copy: true atau false
    isHasil: function() {
      return !this.selectHasil
    },
    isCopy: function() {
      return !this.selectCopy
    },
    isTweet: function() {
      return !this.selectTweet
    }
  },
  watch: {
    // textarea: copydanpaste
    copydanpaste() {
      // textarea hasil: loading...
      this.hasil = 'Loading...'
      
      // vue methods: memuat
      this.memuat()
    }
  },
  methods: {
    // memuat: dari textarea copydanpaste ini
    memuat() {
      this.arraytrends = []
      this.arraytrendsindex = []

      let trends = ''

      // regex101.com
      const regex = /(Sedang tren dalam topik Indonesia|Trending in Indonesia|Populer|Trending)\n?\n(.*)\n?\n([\d.,]+.*)?/gm
      
      const str = this.copydanpaste
      
      let m
      let i = 0

      while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
          if (groupIndex === 2) {
            this.arraytrends.push({
              text: match,
              completed: true
            })
            this.arraytrendstext[i] = match
            i++
          }
        })
      }

      // 'Oknum, Motor, ' ke 'Oknum, Motor'
      if (this.arraytrends.length != 0) {
        trends = 'Tags: ' + this.arraytrendstext.join(', ')
        this.selectHasil = true
        this.selectCopy = true
        this.selectTweet = true

        this.count = 280 - trends.length
      } else if (str != '' && this.arraytrends.length == 0) {
        trends = 'Tidak ada hasil'
        this.selectHasil = false
        this.selectCopy = false
        this.selectTweet = false

        this.count = 280
      }
      
      this.hasil = trends
    },
    
    // button: reset dan copy
    btnReset() {
      this.copydanpaste = ''
      // autofocus
      this.$refs.copydanpaste.focus()

      this.hasil = ''
      this.selectCopy = false
      this.selectTweet = false
      this.arraytrends = []
    },
    btnCopy() {
      if (this.hasil == '' || this.hasil == 'Tidak ada hasil') {
        return
      }
      
      this.$refs.hasil.select()
      // Untuk perangkat seluler
      this.$refs.hasil.setSelectionRange(0, 99999);
    
      navigator.clipboard.writeText(this.hasil);
    },
    btnTweet() {
      if (this.hasil.length > 280) {
        this.selectTweet = false
        return
      }
      const UTF8_hash = this.hasil.replaceAll("#", "%23")
      window.open("https://twitter.com/intent/tweet?text="+UTF8_hash, "_blank")
    },

    // berubah dalam array untuk trends
    trendsChanged(event, index) {
      const text = this.arraytrends[index].text

      const kananKoma = `${text}, `
      const kiriKoma = `, ${text}`
      const keduanyaKoma = `, ${text}, `

      if (event.target.checked) {
        console.debug("checked", `${index} => ${text}`)

        this.arraytrendstext[index] = text
        if (this.hasil === 'Tidak ada hasil') {
          this.hasil =  `Tags: ${text}`
          // pilih hasil, button copy dan button tweet: true
          this.selectHasil = true
          this.selectCopy = true
          this.selectTweet = true
        } else {
          let oldArraytrendstext = ''
          for (let i = 0; i < this.arraytrendstext.length; i++) {
            if (this.arraytrendstext[i] !== '') {
              oldArraytrendstext += `${this.arraytrendstext[i]}, `
            }
          }

          this.hasil = 'Tags: ' + oldArraytrendstext.substring(0, oldArraytrendstext.length-2)
        }
      } else {
        console.debug("unchecked", `${index} => ${text}`)
        this.arraytrendstext[index] = ''
        let melepas = ''
        if (this.hasil.includes(kananKoma)) {
          melepas = kananKoma
        } else if (this.hasil.includes(kiriKoma)) {
          melepas = kiriKoma
        } else if (this.hasil.includes(keduanyaKoma)) {
          melepas = keduanyaKoma
        } else {
          // melepas = text 
          this.hasil = 'Tidak ada hasil'
          // pilih hasil, button copy dan button tweet: false
          this.selectHasil = false
          this.selectCopy = false
          this.selectTweet = false
          return
        }
        this.hasil = this.hasil.replace(melepas, '')
      }
    }
  }
}
</script>

<template>
  <p>Twitter Trends</p>
  <p> <a href="https://twitter.com/i/trends" target="_blank">twitter.com/i/trends</a> + Select All (ctrl + a)</p>

  <h3>Copy (ctrl + c) sini!</h3>
    <textarea v-model="copydanpaste" ref="copydanpaste" data-test="copydanpaste" rows="8" cols="50" 
    placeholder="Tren
Sedang tren dalam topik Indonesia
Aksi Cepat Tanggap
10,3 rb Tweet
Sedang tren dalam topik Indonesia
Oknum
3.581 Tweet
Sedang tren dalam topik Indonesia
Motor
44,9 rb Tweet ..." autofocus></textarea>
  <br>
  <button @click="btnReset" data-test="btnReset">Reset</button>
  <br>

  <h3>... dan Paste (ctrl + v)!</h3>
  <textarea v-model="hasil" data-test="hasil" ref="hasil" rows="5" cols="50" 
    placeholder="Tags: Aksi Cepat Tanggap, Axelsen, Desta, Oknum, Motor, ..." :disabled="isHasil"></textarea>
  <br>
  <button @click="btnCopy" data-test="btnCopy" :disabled="isCopy">Copy</button>
  <button @click="btnTweet" data-test="btnTweet" :disabled="isTweet">Tweet is: {{count}}</button>
  <br>
  
  <h4 v-if="arraytrends.length > 0">Kotak Centang:</h4>
  <div
    v-for="(trends, index) in arraytrends"
    :key="trends.text"
    data-test="arrayTrends"
    :class="[trends.completed ? 'completed' : '']"
    @change="trendsChanged($event, index)"
  >
    <input
      type="checkbox"
      v-model="trends.completed"
      data-test="trends-checkbox"
    />
    {{ trends.text }}
  </div>
</template>