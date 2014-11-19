var sys = require('sys');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

// Symbolically link react modules
exec('npm link app/src/js/actions', puts);
exec('npm link app/src/js/constants', puts);
exec('npm link app/src/js/dispatcher', puts);
exec('npm link app/src/js/components', puts);
exec('npm link app/src/js/stores', puts);
exec('npm link app/src/js/utils', puts);
