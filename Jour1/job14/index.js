const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let file ='';


    if (req.url === '/') {
        file = 'index.html';
    } else if (req.url === '/about') {
        file = 'about.html';
    } else {
        file = 'erreur.html'; 
    }

    const filePath = path.join(__dirname, file);

    fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                const contentType = file === 'erreur.html' ? 'text/plain' : 'text/html';
                const statusCode = file === 'erreur.html' ? 404 : 200;

                res.writeHead(statusCode, { 'Content-Type': 'contentType' });
                res.end(content);
            }
        });
});   

    server.listen(8888, () => {
        console.log('Server running at http://localhost:8888');
    });



        

        