<script>
import axios from 'axios'
export default {
  data() {
    return {
      getdaytrends: '',
      trends: '',
      // pilih hasil, button submit dan button copy: true atau false
      selectSubmit: false,
      selectHasil: false,
      selectCopy: false
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
  async created() {
    try {
      const res = await axios.get(`https://getdaytrends.com/indonesia/bekasi/`)
      this.getdaytrends = res.data
      this.selectSubmit = true
    } catch (error) {
      alert(error)
    }
  },
  watch: {
    // textarea: getdaytrends
    getdaytrends() {
      this.memuat()
    }
  },
  methods: {
    // memuat: dari textarea getdaytrends ini
    memuat() {
      let trends = ''

      // TODO: regex without "
      // regex101.com
      const regex = /<td class="main"><a (class="string" )?href="[^"]+">([^"]+)<\/a><div class="desc"><span class="small text-muted">(Under )?(\d*\.\d+|\d+\.\d*|\d+)K tweets<\/span><\/div><\/td>/gm
      
      const str = this.getdaytrends
      
      let m;

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
      
      console.log(trends)
      this.hasil = trends
    },

    // button: submit dan copy
    btnSubmit() {
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
  <textarea v-model="hasil" data-test="hasil" ref="hasil" rows="5" cols="50" 
    placeholder="Aksi Cepat Tanggap, Axelsen, Desta, Oknum, Motor, ..." :disabled="isHasil"></textarea>
  <br>
  <button @click="btnCopy" data-test="btnCopy" :disabled="isCopy">Copy</button>
  <br>
</template>

