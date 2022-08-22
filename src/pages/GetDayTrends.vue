<script>
import axios from 'axios'
export default {
  data() {
    return {
      // data getdaytrends.com
      getdaytrends: '',
      // textarea: hasil
      hasil: '',

      // pilih hasil, button submit dan button copy: true atau false
      selectSubmit: false,
      selectHasil: false,
      selectCopy: false,

      // pindah CORS: true atau false
      pindah: true
    }
  },
  computed: {
    // adalah submit, hasil dan button copy: true atau false
    isSubmit: function() {
      return !this.selectSubmit
    },
    isHasil: function() {
      return !this.selectHasil
    },
    isCopy: function() {
      return !this.selectCopy
    }
  },
  created() {
    this.dibuat()
  },
  watch: {
    // textarea: getdaytrends
    getdaytrends() {
      this.memuat()
    },
    // checkbox: pindah
    pindah() {
      this.dibuat()
    }
  },
  methods: {
    // dibuat: dari textarea getdaytrends ini
    async dibuat() {
      // textarea hasil: loading...
      this.hasil = 'Loading...'

      try {
        // TODO: test getdaytrends.com
        let pindah = ''
        if (!this.pindah) {
          pindah = `https://getdaytrends.com/indonesia/bekasi/`
        } else {
          pindah = `/getdaytrends.test.html`
        }
          
        const res = await axios.get(pindah)
        this.getdaytrends = res.data
        this.selectSubmit = true

        // hasil
        this.memuat()
      } catch (error) {
        this.hasil = ''
        this.selectHasil = false
        this.selectSubmit = false
        this.selectCopy = false
        alert(error)
      }
    },
    // memuat: dari textarea getdaytrends ini
    memuat() {
      let trends = ''

      // TODO: regex without "
      // regex101.com
      const regex = /<td class="main"><a (class="string" )?href="[^"]+">([^"]+)<\/a><div class="desc"><span class="small text-muted">(Under )?(\d*\.\d+|\d+\.\d*|\d+)K tweets<\/span><\/div><\/td>/gm
      
      const str = this.getdaytrends
      
      let m;

      let i = 0
      while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
          if (groupIndex === 2) {
            // unescape HTML
            const unescapeHtml = match
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, "\"")
              .replace(/&#39;/g, "'")

            trends += `${unescapeHtml}, `
          }

          // // Misalnya: 20K
          // if (groupIndex === 4) {
          //   console.log(match)
          // }
        })
        
        i++
        // trends getdaytrends.com: no. 1-15
        if (i === 15) {
          break
        }
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

    // button: submit dan copy
    btnSubmit() {
      this.selectHasil = false
      this.selectCopy = false

      // textarea hasil: loading...
      this.hasil = 'Loading...'

      this.memuat()
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
  Test getdaytrends.com:
  <input type="checkbox" v-model="pindah" />
	<label for="checkbox">{{ pindah }}</label>
  
  <p>TODO:</p>
  <ol>
    <li>regex: without "</li>
    <li>AxiosError: Network Error</li>
    The CORS Header 'Access-Control-Allow-Origin' is missing.

    <br>
    CORS rules are bypassed: 
    <a href="https://addons.mozilla.org/en-US/firefox/search/?q=cors" target="_blank">Firefox</a> |
    <a href="https://chrome.google.com/webstore/search/cors?hl=en" target="_blank">Chrome</a>
  </ol>
  <p>--------------------------------------------------------</p>
  <p>(alpha) GetDayTrends.com!</p>
  <p> <a href="https://getdaytrends.com/indonesia/bekasi/" target="_blank">getdaytrends.com/indonesia/bekasi/</a> </p>

  <button @click="btnSubmit" data-test="btnSubmit" :disabled="isSubmit">Submit</button>
  <br>
  
  <h3>... dan Paste!</h3>
  
  <p>Tren Twitter Sekarang:</p>
  <p v-if="pindah">Test getdaytrends.com</p>
  <textarea v-model="hasil" data-test="hasil" ref="hasil" rows="5" cols="50" 
    placeholder="Aksi Cepat Tanggap, Axelsen, Desta, Oknum, Motor, ..." :disabled="isHasil"></textarea>
  <br>
  <button @click="btnCopy" data-test="btnCopy" :disabled="isCopy">Copy</button>
  <br>
</template>

