/* jslint node: true */
'use strict';

//
//	Main
//

var	C = require('./config'),
	E = require('./lib/engine'),
	K = require('./lib/keys'),
	L = require('./lib/log'),
	N = require('./lib/numbers'),
	O = require('./lib/oeis'),
	S = require('./lib/source');


// Load chunks from Liber.
console.log('[-] Loading chunks..');
var data = S.get({s:[0, 1, 2, 3, 4, 5, 6, 15, 16]});
console.log('[-] Done loading chunks..');

// Process data with n iterations.
console.log('[-] Processing data..');
data = E.process(data, 1);
console.log('[-] Done processing data..');

// Echo results.
L.toScreen(data);

