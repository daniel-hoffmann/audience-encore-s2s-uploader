const https = require('https');
const LineByLineReader = require('line-by-line');
const parse = require('csv-parse');
const file = require('./components/file');

// TODO: maybe move this to config or ENV file
const config = {
  logFolder: __dirname + '/logs/',
  dataFolder: __dirname + '/data/',
  // TODO: filename should be read by script in order to automate
  // filename without extension
  fileName: '<filename>',
  timestamp: Date.now(),
};

file.openFile(config.logFolder, config.fileName, config.timestamp);
// TODO: currently tsv is hardcoded, this should work with csv, too.
const lr = new LineByLineReader(config.dataFolder + config.fileName + '.tsv');

lr.on('error', function (err) {
  console.error(err);
});

lr.on('line', function (line) {
  lr.pause();
  parse(line, { delimiter: ['\t'] }, function (err, output) {
    lr.resume();
    const userInfo = output[0];
    const options = {
      host: 'aud.pubmatic.com',
      path:
        // TODO: segid can be multiple
        // TODO: IP needs to be added - country/IP logic, i.e. one has to be there, both can
        `/AdServer/Artemis?dpid=${userInfo[0]}&userid=${userInfo[1]}&segid=${userInfo[2]}&country=${userInfo[4]}&uidtype=${userInfo[5]}`,
      method: 'GET',
    };
    const req = https.request(options, (res) => {
      res.on('data', (d) => {
        console.log(`${res.statusCode},${d},${res.req.path}`);
        if (res.statusCode !== 200) {
          file.addLine(
            config.logFolder,
            config.fileName,
            config.timestamp,
            res.statusCode,
            d,
            res.req.path
          );
        }
      });
    });
    req.on('error', (e) => {
      console.error(e);
    });
    req.end();
  });
});

lr.on('end', function () {
  // All lines are read, file is closed now.
});
