const fs = require('fs');

fs.writeFile('C:/xampp/htdocs/Runtrack-nodeJS/Jour1/job6/data.txt', 'Je manipule les fichiers avec un module node !\n', (err) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('Saved!');
});