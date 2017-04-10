// (js_modules)
var execSync = require('child_process').execSync;
var os = require('os');

// (js_bower) Run developer installed bower
var args = process.argv.slice(2, process.argv.length).join(' ');
var bower = __dirname + '/../../node_modules/bower/bin/bower';
execSync('node "' + bower + '" --config.cwd=slides --config.directory=js ' + args, {stdio: [0, 1, 2]});
