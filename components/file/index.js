const fs = require('fs').promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    console.log(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function openFile(filepath, filename) {
  try {
    const csvHeaders = 'statuscode,response,path';
    // TODO: add human readable timestamp to log filename
    await fs.writeFile(filepath + filename + '.log', csvHeaders);
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

async function addLine(filepath, filename, statuscode, response, path) {
  try {
    const csvLine = `\n${statuscode},${response},${path}`;
    await fs.writeFile(filepath + filename + '.log', csvLine, {
      flag: 'a',
    });
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

exports.readFile = readFile;
exports.openFile = openFile;
exports.addLine = addLine;
