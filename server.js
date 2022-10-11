const express = require('express')
const cors = require('cors')
const serveStatic = require('serve-static')
const axios = require('axios').default
const path = require('path')

const app = express()

app.use(cors())

// here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const api = 'http://twittertrendingtopics.herokuapp.com/api/trends/Indonesia'
app.get('/api/trends', (req, res) => {
    axios.get(api)
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