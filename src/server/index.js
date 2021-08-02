// TODO: Configure the environment variables
const dotEnv = require('dotenv');
dotEnv.config();
var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')

const PORT = 8081

const app = express()
app.use(cors())


app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))
// TODO: Create an instance for the server

// TODO: Configure express static directory.
app.use(express.static('dist'))

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})
// a route that handling post request for new URL that coming from the frontend
/* TODO:
    1. GET the url from the request body
    2. Build the URL it should be something like `${BASE_API_URL}?key=${MEAN_CLOUD_API_KEY}&url=${req.body.url}&lang=en`
    3. Fetch Data from API
    4. Send it to the client
    5. REMOVE THIS TODO AFTER DOING IT 😎😎
    server sends only specified data to the client with below codes
     const sample = {
       text: '',
       score_tag : '',
       agreement : '',
       subjectivity : '',
       confidence : '',
       irony : ''
     }
*/
const url = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
console.log(`Your API Key is ${process.env.API_KEY}`);
let article = []

app.post('/Api', async function(req, res) {
    article = req.body.url;
    console.log(`You entered: ${article}`);
    const apiURL = `${url}key=${apiKey}&url=${article}&lang=en`

    const response = await fetch(apiURL)
    const data = await response.json()
    console.log(data)
    res.send(data)
})


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})

// TODO: export app to use it in the unit testing
