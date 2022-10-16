const express = require('express')
const cors = require('cors')
const axios = require('axios').default
const path = require('path')

const app = express()

app.use(cors())

// this * route is to serve project on different page routes except root `/`
app.get('/', function (req, res) {
    res.json({
      message: 'Hi!'
    })
})

app.get('/api/trends', (req, res) => {
    axios.get('http://twittertrendingtopics.herokuapp.com/api/trends/Indonesia')
    .then(function (response) {
        // handle success
        res.json(response.data)
    }).catch(function (error) {
        // handle error
        res.json(error)
    })
})

app.get('/url', async(req, res) => {    
      res.writeHead(200)
      try {
        const response = await axios.get('https://getdaytrends.com/indonesia/bekasi/')
        res.write(response.data)
      } catch (error) {
        res.json(error)
      }
      res.end()
})

const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)