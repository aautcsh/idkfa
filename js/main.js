/* jslint node: true */
'use strict';

//
//	Main
//
//	Words:		3623
//	Clauses:	192
//	Paragraphs:	35
//	Segments: 	17
//	Lines: 		746
//	Pages: 		71

// Unsolved: 7,8,9,10,11,12,13,14
// Good: 7, 9, 11, 12
// Semi: 8

var	C = require('./config'),
	E = require('./lib/engine'),
	K = require('./lib/keys'),
	L = require('./lib/log'),
	N = require('./lib/numbers'),
	O = require('./lib/oeis'),
	S = require('./lib/source');

var	CL	= require('cluster');
var	CPU	= require('os').cpus().length;

if (CL.isMaster)
{
	// Fix me!
	CPU = 1;

	while (CPU --) CL.fork();
	CL.on('SIGINT', function () {process.exit(0);});
}

else
{
	// Load chunks from Liber.
	var data = S.get({s:[0]});

	// Add a key with no shift.
	if (!K.keys) K.add([0]);

	// Add keys from config file.
	if (C.keys.length > 0) for (var i = 0, ii = C.keys.length; i < ii; i ++ ) K.add(C.keys[i]);

	// Add OEIS entries as keys.
	//var oeis = O.get(0);
	//if (oeis[1] === -1) console.log('\nAttention: OEIS results were filtered. ' + oeis[0].length + ' passed.');
	//if (oeis[0].length > 0) for (var j = 0, jj = oeis[0].length; j < jj; j ++) K.add(oeis[0][j]);

	// Process data with n iterations.
	data = E.process(data, 1);

	L.toScreen(data);
}