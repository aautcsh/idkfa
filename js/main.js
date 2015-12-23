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

// Solved:		0, 1, 2, 3, 4, 5, 6, 15, 16
// Unsolved:	7, 8, 9, 10, 11, 12, 13, 14
// Promising:	7, 9, 11, 12
// Semi:		8, 10

// p 16, 17, 18, 19, 21, (22), 23, 24, 25, (26), (27), (28), (29), 30, 32
// p 16, 17, 18, 19, 21, 23, 24, 25, 30, 32

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
	var data = S.get({s:[0, 1, 2, 3, 4, 5, 6, 15, 16]});

	// Add a key with no shift.
	if (!K.keys) K.add([0]);

	K.add('divinity', 1);
	K.add([3]);
	K.add('firfumferenfe', 1);


	// Add keys from config file.
	//if (C.keys.length > 0) for (var i = 0, ii = C.keys.length; i < ii; i ++ ) K.add(C.keys[i], 1);

	// Add OEIS entries as keys.
	//var oeis = O.get(101000, 102000);
	//if (oeis[1] === -1) console.log('\nAttention: OEIS results were filtered. ' + oeis[0].length + ' passed.');
	//if (oeis[0].length > 0) for (var j = 0, jj = oeis[0].length; j < jj; j ++) K.add(oeis[0][j]);

	// Process data with n iterations.
	data = E.process(data, 1);

	L.toScreen(data);
}