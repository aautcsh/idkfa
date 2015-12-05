/* jslint node: true */
'use strict';

//
//	Main
//

var	C = require('./config'),
	E = require('./lib/engine'),
	L = require('./lib/log'),
	O = require('./lib/oeis'),
	S = require('./lib/source');

var	CL	= require('cluster');
var	CPU	= require('os').cpus().length;

// Fork on multi core.
if (CL.isMaster)
{
	while (CPU --) CL.fork();
	CL.on('SIGINT', function () {process.exit(0);});
}

else
{
	// Container.
	var keys = [], data = [];

	// Load Liber.
	var chunks = S.select({s:[0,1]});

	// Load OEIS sequences.
	var oeis = O.select(C.oeis);
	console.log(oeis[1] + ' loaded');

	// Add custom keys if any or [0] to have an iteration with no shifting.
	keys = (C.keys) ? C.keys : [0];

	// Crunch data.
	data = E.process(chunks, keys);

	// Display data and exit.
	if (L.toScreen(data)) process.exit(0);
}