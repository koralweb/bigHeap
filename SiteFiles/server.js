const express = require('express')
const path = require('path')

const app = express()


app.use(express.static('dist'))
app.use(express.json())
app.get('/', (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(7777, () => {
    console.log('Server start on port 7777 ...')
})
