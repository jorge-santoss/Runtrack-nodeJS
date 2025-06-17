const fs = require('fs');

fs.readFile('C:/xampp/htdocs/Runtrack-nodeJS/Jour1/job6/data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

    // Split the data into an array of lines
  let filteredText = '';
  for (let i = 0; i < data.length; i += 2) {
    filteredText += data[i];
  }

  console.log(filteredText);
});