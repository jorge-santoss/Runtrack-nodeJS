const http = require('http');
const handleRequest = require('./routes');

const server = http.createServer((req, res) => {
    handleRequest(req, res);
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});