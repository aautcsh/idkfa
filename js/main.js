/* jslint node: true */
'use strict';

//
//	Main
//

var C = require('./config'),
	E = require('./lib/engine'),
	L = require('./lib/log'),
	O = require('./lib/oeis'),
	S = require('./lib/source');

var CL	= require('cluster');
var CPU	= require('os').cpus().length;

// Fork on multicore.
//if (CL.isMaster) while (CPU --) CL.fork();

// Container.
var keys = [], data = [];

// Load Liber.
var chunks = S.select({s:[0,1]});

// Load OEIS sequences.
//var oeis = O.select(C.oeis);

// Add custom keys.
keys = [[0], 'divinity'];

// Crunch data.
data = E.process(chunks, keys);

// Display data.
L.toScreen(data);

// </3