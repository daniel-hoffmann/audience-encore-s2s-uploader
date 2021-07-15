const file = require('./components/file');
file.readDirectory('./data/');

// const testFolder = './data/';
// const fs = require('fs');
// const fileArray = [];
// fs.readdir(testFolder, (err, files) => {
//   files.forEach((file) => {
//     if (file.endsWith('tsv') | file.endsWith('csv')) {
//       fileArray.push(file);
//     }
//   });
//   console.log(fileArray);
// });
