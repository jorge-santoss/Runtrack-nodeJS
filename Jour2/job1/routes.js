const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json');

function handleRequest(req, res) {
    const { method, url } = req;

    if (method === 'GET' && url === '/tasks') {
        getTasks(req, res);
    } else if (method === 'POST' && url === '/tasks') {
        createTask(req, res);
    } else if (method === 'PUT' && url.startsWith('/tasks/')) {
        updateTask(req, res);
    } else if (method === 'DELETE' && url.startsWith('/tasks/')) {
        deleteTask(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}

function getTasks(req, res) {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
    });
}

function createTask(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const newTask = JSON.parse(body);
            fs.readFile(dataFilePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                const existingData = JSON.parse(data);
                newTask.id = existingData.tasks.length > 0 
                    ? Math.max(...existingData.tasks.map(task => task.id)) + 1 
                    : 1;
                existingData.tasks.push(newTask);
                fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2), err => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                        return;
                    }
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newTask));
                });
            });
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });  
            res.end('Bad Request: Invalid JSON');
        }
    });
}

function updateTask(req, res) {
    const id = parseInt(req.url.split('/')[2]);
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const updatedTask = JSON.parse(body);
            fs.readFile(dataFilePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                const existingData = JSON.parse(data);
                const index = existingData.tasks.findIndex(task => task.id === id);
                if (index === -1) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Not Found');
                    return;
                }
                existingData.tasks[index] = { ...existingData.tasks[index], ...updatedTask };
                fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2), err => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(existingData.tasks[index]));
                });
            });
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Bad Request: Invalid JSON');
        }
    });
}

function deleteTask(req, res) {
    const id = parseInt(req.url.split('/')[2]);
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }
        const existingData = JSON.parse(data);
        const index = existingData.tasks.findIndex(task => task.id === id);
        if (index === -1) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            return;
        }
        existingData.tasks.splice(index, 1);
        fs.writeFile(dataFilePath, JSON.stringify(existingData, null, 2), err => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(204);
            res.end();
        });
    });
}

module.exports = handleRequest;