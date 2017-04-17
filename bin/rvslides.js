#!/usr/bin/env node

// (rvslides_modules)
var execSync = require('child_process').execSync;
var fs = require('fs-extra');
var argv = require('yargs')
.usage('Usage: rvslides <command> [options]')
.command('create', 'Create Reveal.js slides')
.example('rvslides create', 'Create presentation in current directory')
.example('rvslides create slides', 'Create presentation in slides folder')
.command('pdf', 'Render Reveal,js slides to pdf')
.example('rvslides pdf', 'Render index.html to pdf/index.pdf')
.example('rvslides pdf slides.html slides.pdf', 'Render chosen files')
.demandCommand(1)
.alias('s', 'source')
.alias('o', 'out')
.help('h')
.alias('h', 'help')
.argv;

// (rvslides_variables)
var cmd = argv._[0];

// (rvslides_create) Copy slides as template
if (cmd === 'create') {
  var slidesOut = argv._[1] || argv.out || '';
  fs.copy(__dirname + '/../slides', slidesOut, function (err) {
   if (err) {
     console.error(err);
   }
   if (slidesOut === '') {
     console.log('Created Reveal.js template');
   } else {
     console.log('Created Reveal.js template at ' + slidesOut);
   }
  });
}

// (rvslides_pdf) Render pdf
if (cmd === 'pdf') {

  // (pdf_modules)
  var os = require('os');

  // (pdf_install) Run pdf install if it does not exist
  var phantomjs = __dirname + '/../node_modules/decktape/phantomjs';
  if (!fs.existsSync(phantomjs)) {
    execSync('node "' + __dirname + '/../scripts/pdf/install.js', {stdio: [0, 1, 2]});
  }

  // (pdf) Run pdf using decktape and phantomjs
  var decktape = __dirname + '/../node_modules/decktape/decktape.js';
  var platform = os.platform();
  var pdfSrc = argv._[1] || argv.source || 'index.html';
  var pdfDest = argv._[2] || argv.out || 'pdf/index.pdf';
  if (platform === 'win32') {
    execSync('"' + phantomjs + '.exe' + '" "' + decktape + '" ' + pdfSrc + ' ' + pdfDest, {stdio: [0, 1, 2]});
  } else {
    execSync('"' + phantomjs + '" "' + decktape + '" "' + pdfSrc + ' ' + pdfDest, {stdio: [0, 1, 2]});
  }
}
