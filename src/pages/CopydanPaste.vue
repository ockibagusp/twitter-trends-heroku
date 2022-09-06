<script>
export default {
  data() {
    return {
      // textarea: copydanpaste dan hasil
      copydanpaste: '',
      hasil: '',

      // array untuk trends
      arraytrends: [],

      // tweet dihasil maks. 140 karakter
      count: 0,

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
      
      let trends = ''

      // regex101.com
      const regex = /(Sedang tren dalam topik Indonesia|Trending in Indonesia|Populer|Trending)\n?\n(.*)\n?\n([\d.,]+.*)?/gm
      
      const str = this.copydanpaste
      
      let m

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
            trends += `${match}, `
          }
        })
      }

      // 'Oknum, Motor, ' ke 'Oknum, Motor'
      if (this.arraytrends.length != 0) {
        trends = 'Tags: ' + trends.substring(0, trends.length-2)
        this.selectHasil = true
        this.selectCopy = true
        this.selectTweet = true
      } else if (str != '' && this.arraytrends.length == 0) {
        trends = 'Tidak ada hasil'
        this.selectHasil = false
        this.selectCopy = false
        this.selectTweet = false
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
      if (this.hasil.length > 140) {
        this.selectTweet = false
        return
      }
      const UTF8_hash = this.hasil.replace("#", "%23")
      window.open("https://twitter.com/intent/tweet?text="+UTF8_hash, "_blank")
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
  
  <h4 v-if="arraytrends.length > 0">Twitter Trends:</h4>
  <div
    v-for="trends in arraytrends"
    :key="trends.text"
    data-test="arrayTrends"
    :class="[trends.completed ? 'completed' : '']"
  >
    <input
      type="checkbox"
      v-model="trends.completed"
      data-test="trends-checkbox"
    />
    {{ trends.text }}
  </div>
</template>