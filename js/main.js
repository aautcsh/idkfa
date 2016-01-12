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
var data = S.get({s:[]});

// Add a key with no shift.
K.add([0]);

// Add known keys.
K.add('divinity', 1);
K.add([3]);
K.add('firfumferenfe', 1);

// Process data with n iterations.
data = E.process(data, 1);

// Echo results.
L.toScreen(data);