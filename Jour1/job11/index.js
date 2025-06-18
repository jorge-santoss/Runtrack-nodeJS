const http = require('http');

const server = http.createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send the response body "Hello World"
  res.end('Hello World!\n');
});

server.listen(8888, () => {

console.log(`Server running at http://localhost:8888/`);
});
