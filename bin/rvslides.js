#!/usr/bin/env node

// (rvslides_modules)
var execSync = require('child_process').execSync;
var fs = require('fs');
var ncp = require('ncp').ncp;
var argv = require('yargs')
.usage('Usage: $0 <command> [options]')
.command('create', 'Create a Reveal.js template inside the given folder')
.example('$0 create -o slides', 'Create Reveal.js presentation inside a folder named slides')
.command('pdf', 'Render the index.html to pdf/index.pdf')
.example('$0 pdf', 'Render index.html to pdf/index.pdf')
.example('$0 pdf path/to/slides.html path/to/slides.pdf', 'Render different Reveal.js html slides to a pdf')
.demandCommand(1)
.alias('s', 'source')
.alias('o', 'out')
.argv;

// (rvslides_variables)
var cmd = argv._[0];

// (rvslides_create) Copy slides as template
if (cmd === 'create') {
  var slidesOut = argv._[1] || argv.out || 'slides';
  ncp(__dirname + '/../slides', slidesOut, function (err) {
   if (err) {
     console.error(err);
   }
   console.log('Created Reveal.js template at ' + slidesOut);
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
  var pdfDest = argv._[2] || argv.out || 'index.html pdf/index.pdf';
  if (platform === 'win32') {
    execSync('"' + phantomjs + '.exe' + '" "' + decktape + '" ' + pdfSrc + ' ' + pdfDest, {stdio: [0, 1, 2]});
  } else {
    execSync('"' + phantomjs + '" "' + decktape + '" "' + pdfSrc + ' ' + pdfDest, {stdio: [0, 1, 2]});
  }
}
