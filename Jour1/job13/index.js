const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let file = "index.html";

  if (req.url === "/about") {
    file = "about.html";
  }

  const filePath = path.join(__dirname, file);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });

      res.end("404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    } 
  });
});
server.listen(8888, () => {
  console.log("Server running at http://localhost:8888");
});







// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const server = http.createServer((req, res) => {
//   let file = 'index.html'; // Default file for "/"

//   // If the URL is not "/", use the path as the filename
//   if (req.url !== '/' && req.url !== '') {
//     file = req.url.slice(1); // e.g., "/about.html" → "about.html"
//   }

//   const filePath = path.join(__dirname, file);

//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       res.writeHead(404, { 'Content-Type': 'text/plain' });
//       res.end('404 Not Found');
//       return;
//     }

//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(data);
//   });
// });

// server.listen(8888, () => {
//   console.log('✅ Server running at http://localhost:8888/');
// });
