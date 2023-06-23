const http = require('http')
const fs = require('fs')
const path = require("path");

const server = http.createServer((req, res) => {
    if(req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })

        fs.readFile(
            path.join(__dirname, 'dist', 'index.html'),
            'utf-8',
            (err, content) => {
                if(err) throw err
                res.end(content)
            }
        )
    }
})

server.listen(7777, () => {
    console.log('Server start on port 7777 ...')
})
