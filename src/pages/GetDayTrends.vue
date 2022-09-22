<script>
import axios from 'axios'

// PINDAH: test, CORS dan GitHub-Pages
const PINDAH = [0, 1, 2]

export default {
  data() {
    return {
      // data getdaytrends.com
      getdaytrends: '',
      // textarea: hasil
      hasil: '',

      // array untuk trends
      arraytrends: [],

      // pilih hasil, button submit dan button copy: true atau false
      selectSubmit: false,
      selectHasil: false,
      selectCopy: false,

      // pindah: test, CORS dan GitHub Pages
      pindah: PINDAH[2]
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
        // TODO: getdaytrends.com test, CORS dan GitHub-Pages
        if (this.pindah == PINDAH[0]) {
          this.getdaytrends = '<td class="main"><a href="/indonesia/bekasi/trend/%23TimnasIndonesia/">#TimnasIndonesia</a><div class="desc"><span class="small text-muted">22.1K tweets</span></div></td>'
        } else if (this.pindah == PINDAH[1]) {
          const res = await axios.get('https://getdaytrends.com/indonesia/bekasi/')
          this.getdaytrends = res.data
        } else {
          const res = await axios.get('/twitter-trends/url')
          this.getdaytrends = res.data
        }

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
      const regex = /<td class="main"><a (class="string" )?href="[^"]+">([^'"]+)<\/a><div class="desc"><span class="small text-muted">(Under )?(\d*\.\d+K tweets|\d+\.\d*K tweets|\d+K tweets)<\/span><\/div><\/td>/gm
      
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

            this.arraytrends[i] = {
              name: unescapeHtml,
              tweetVolume: '',
              completed: true
            }

            trends += `${unescapeHtml}, `
          }

          if (groupIndex === 3) {
            if (match !== undefined)
              this.arraytrends[i].tweetVolume = `${match}`
          }

          // Misalnya: 20K
          if (groupIndex === 4) {
            this.arraytrends[i].tweetVolume += match
          }
        })
        
        i++
        // trends getdaytrends.com: no. 1-15
        if (i === 15) {
          break
        }
      }

      // 'Oknum, Motor, ' ke 'Oknum, Motor'
      if (trends != '') {
        trends = 'Tags: ' + trends.substring(0, trends.length-2)
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
  <div>Pindah:</div>

  <input type="radio" value=0 v-model="pindah" />
  <label for="test">Test</label> | 

  <input type="radio" value=1 v-model="pindah" />
  <label for="cors">CORS</label> |

  <input type="radio" value=2 v-model="pindah" />
  <label for="GitHub-Pages">GitHub-Pages</label>

  <p v-if="pindah == 0">&gt;&gt;&gt; Test getdaytrends.com</p>
  <div v-if="pindah == 1">
    <li>&gt;&gt;&gt; AxiosError: Network Error</li>
    The CORS Header 'Access-Control-Allow-Origin' is missing.
    <br>
    CORS rules are bypassed: 
    <a href="https://addons.mozilla.org/en-US/firefox/search/?q=cors" target="_blank">Firefox</a> |
    <a href="https://chrome.google.com/webstore/search/cors?hl=en" target="_blank">Chrome</a>
  </div>
  <div v-if="pindah == 2">
    &gt;&gt;&gt; localhost: bisa | ockibagusp.github.io/twitter-trends: tidak bisa
  </div>

  <p>--------------------------------------------------------</p>
  <p>(beta) GetDayTrends.com!</p>
  <p> <a href="https://getdaytrends.com/indonesia/bekasi/" target="_blank">getdaytrends.com/indonesia/bekasi/</a> </p>

  <button @click="btnSubmit" data-test="btn-submit" :disabled="isSubmit">Submit</button>
  <br>
  
  <h3>... dan Paste (ctrl + v)!</h3>
  
  <textarea v-model="hasil" data-test="hasil" ref="hasil" rows="5" cols="50" 
    placeholder="Tags: Aksi Cepat Tanggap, Axelsen, Desta, Oknum, Motor, ..." :disabled="isHasil"></textarea>
  <br>
  <button @click="btnCopy" data-test="btn-copy" :disabled="isCopy">Copy</button>
  <br>

  <h4>Tren Sekarang</h4>
  <div
    v-for="(trends, index) in arraytrends"
    :key="trends.name"
    data-test="array-trends"
    :class="[trends.completed ? 'completed' : '']"
    @change="trendsChanged($event, index)"
  >
    <input
      type="checkbox"
      v-model="trends.completed"
      data-test="trends-checkbox"
    />
    {{ trends.name }}
    <small class="tweetVolume-class">{{ trends.tweetVolume !== 0 ? `(${trends.tweetVolume})` : '' }}</small>
  </div>
</template>

