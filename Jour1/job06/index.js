const fs = require('fs');

const content = fs.readFileSync('Data.txt', 'utf8');
console.log(content);