const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let file = 'index.html'

const filePath = path.join(__dirname, 'index.html');

fs.readFile(filePath, (err, data) => {
    if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
    }
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
});
})

server.listen(8888, () => {
    console.log(`Server running at http://localhost:8888/`);
})