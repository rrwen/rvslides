// Modules
var download = require('download-git-repo');
var fs = require('fs');
var os = require('os');
var request = require('request');
var progress = require('request-progress');

// Platforms and install link
var phantomJS = __dirname + '/../../node_modules/decktape/phantomjs';
console.log(phantomJS);

// (phantomjs_settings)
var installs = {
  win32: {
    download: 'https://github.com/astefanutti/decktape/releases/download/v1.0.0/phantomjs-msvc2013-x86.exe',
    save: phantomJS + '.exe'
  },
  linux: {
    download: 'https://github.com/astefanutti/decktape/releases/download/v1.0.0/phantomjs-linux-x86-64',
    save: phantomJS
  },
  other: {
    download: 'https://github.com/astefanutti/decktape/releases/download/v1.0.0/phantomjs-osx-cocoa-x86-64',
    save: phantomJS
  }};
var platform = os.platform() || 'other';

// (pdf_phantomjs) Create phantom js inside decktape
if (!fs.existsSync(installs[platform].save)) {

  // (phantomjs_download)
  console.log('Downloading forked phantomjs for decktape (https://github.com/astefanutti/phantomjs)...');
  console.log('Using ' + os.platform() + ' version ('+ installs[platform].download + ')...');
  console.log('Destination: ' + installs[platform].save);
  progress(request(installs[platform].download))
  .on('error', function(err) {
    console.log(err);
  })
  .on('progress', function(state) {
    console.log(Math.round(state.percent * 100) + '%');
  })
  .pipe(fs.createWriteStream(installs[platform].save));
}
