<script>
export default {
  data() {
    return {
      // textarea: copydanpaste dan hasil
      copydanpaste: '',
      hasil: '',

      // pilih hasil dan button copy: true atau false
      selectHasil: false,
      selectCopy: false
    }
  },
  computed: {
    // adalah hasil dan button copy: true atau false
    isHasil: function() {
      return !this.selectHasil
    },
    isCopy: function() {
      return !this.selectCopy
    }
  },
  watch: {
    // textarea: copydanpaste
    copydanpaste() {
      this.memuat()
    }
  },
  methods: {
    // memuat: dari textarea copydanpaste ini
    memuat() {
      let trends = ''

      // regex101.com
      const regex = /(Sedang tren dalam topik Indonesia|Trending in Indonesia|Populer|Trending)\n?\n(.*)\n?\n([\d.,]+.*)?/gm
      
      const str = this.copydanpaste
      
      let m;

      while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
          if (groupIndex === 2) {
              trends += `${match}, `
          }
        })
      }

      // 'Oknum, Motor, ' ke 'Oknum, Motor'
      if (trends != '') {
        trends = 'Tags: ' + trends.substr(0, trends.length-2)
        this.selectHasil = true
        this.selectCopy = true
      } if (str != '' && trends == '') {
        trends = 'Tidak ada hasil'
        this.selectHasil = false
        this.selectCopy = false
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
    },
    btnCopy() {
      if (this.hasil == '' || this.hasil == 'Tidak ada hasil') {
        return
      }
      
      this.$refs.hasil.select()
      // Untuk perangkat seluler
      this.$refs.hasil.setSelectionRange(0, 99999);
    
      navigator.clipboard.writeText(this.hasil);
    }
  }
}
</script>

<template>
  <p> <a href="https://twitter.com/i/trends" target="_blank">twitter.com/i/trends</a> + Select All</p>

    <h3>Copy sini!</h3>
      <textarea v-model="copydanpaste" ref="copydanpaste" data-test="copydanpaste" rows="10" cols="50" 
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

    <h3>... dan Paste!</h3>
    <textarea v-model="hasil" data-test="hasil" ref="hasil" rows="5" cols="50" 
        placeholder="Aksi Cepat Tanggap, Axelsen, Desta, Oknum, Motor, ..." :disabled="isHasil"></textarea>
    <br>
    <button @click="btnCopy" data-test="btnCopy" :disabled="isCopy">Copy</button>
    <br>
</template>