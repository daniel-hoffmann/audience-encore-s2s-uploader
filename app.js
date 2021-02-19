const fs = require('fs');
// const path = require('path');
const https = require('https');
const parse = require('csv-parse');
const file = require('./components/file');

const parser = parse({ delimiter: [',', '\t'] }, function (err, records) {
  file.openFile(__dirname + '/log/', 'example-single');
  records.forEach((element) => {
    s2sCall(__dirname + '/log/', 'example-single', element);
  });
});

const s2sCall = (filepath, filename, userInfo) => {
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
      file.addLine(filepath, filename, res.statusCode, d, res.req.path);
    });
  });
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
};

fs.createReadStream(__dirname + '/data/example-single.tsv').pipe(parser);
