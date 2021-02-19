const https = require('https');
const LineByLineReader = require('line-by-line');
const parse = require('csv-parse');
const file = require('./components/file');

const currentFile = 'lifesight1';
// const currentFile = 'example-single';
file.openFile(__dirname + '/log/', currentFile);
const lr = new LineByLineReader(__dirname + '/data/' + currentFile + '.tsv');

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
        //TODO: segid can be multiple
        //TODO: IP needs to be added - country/IP logic, i.e. one has to be there, both can
        `/AdServer/Artemis?dpid=${userInfo[0]}&userid=${userInfo[1]}&segid=${userInfo[2]}&country=${userInfo[4]}&uidtype=${userInfo[5]}`,
      method: 'GET',
    };
    const req = https.request(options, (res) => {
      res.on('data', (d) => {
        console.log(`${res.statusCode},${d},${res.req.path}`);
        file.addLine(
          __dirname + '/log/',
          currentFile,
          res.statusCode,
          d,
          res.req.path
        );
      });
      // lr.resume();
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
