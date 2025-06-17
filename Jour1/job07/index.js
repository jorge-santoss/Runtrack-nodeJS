const fs = require('fs');

fs.readFile('C:/xampp/htdocs/Runtrack-nodeJS/Jour1/job6/data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log(data);
});