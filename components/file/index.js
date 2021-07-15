const fs = require('fs').promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    console.log(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function readDirectory(folderName) {
  try {
    const fileArray = [];
    await fs.readdir(folderName, (err, files) => {
      files.forEach((file) => {
        if (file.endsWith('tsv') | file.endsWith('csv')) {
          fileArray.push(file);
        }
      });
      console.log(fileArray);
    });
    return fileArray;
  } catch (error) {
    console.error(
      `Got an error trying to read the directory: ${error.message}`
    );
  }
}

async function openFile(filepath, filename, timestamp) {
  try {
    const csvHeaders = 'statuscode,response,path';
    // TODO: add human readable timestamp to log filename
    await fs.writeFile(
      filepath + filename + '_' + timestamp + '.log',
      csvHeaders
    );
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

async function addLine(
  filepath,
  filename,
  timestamp,
  statuscode,
  response,
  path
) {
  try {
    const line = `\n${statuscode},${response},${path}`;
    await fs.writeFile(filepath + filename + '_' + timestamp + '.log', line, {
      flag: 'a',
    });
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

exports.readFile = readFile;
exports.openFile = openFile;
exports.addLine = addLine;
exports.readDirectory = readDirectory;
