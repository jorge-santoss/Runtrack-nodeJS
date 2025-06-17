const fs = require('fs');
const path = require ('path');

fs. readdir('..', (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }
    files.forEach(file => {
        const filePath = path.join('..', file);
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error('Error getting stats for file:', err);
                return;
            }
            if (stats.isDirectory()) {
                console.log(file);
            }
        });
    });
});
