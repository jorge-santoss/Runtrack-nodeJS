const path =require('path');

const filePath = 'C:/xampp/htdocs/Runtrack-nodeJS/Jour1/job5/index.js';

// getting the file name
const fileName = path.basename(filePath);
console.log('File Name', fileName);

//  getting the file extension
const extension = path.extname(filePath);
console.log('Extension', extension);

// getting the directory name
const parentName = path.dirname(filePath);
console.log('Parent Directory', parentName);

