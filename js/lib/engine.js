/* jslint node: true */
'use strict';

//
//	Engine
//
//	Array Keys
//
//	U/D = Shift up/down Gematria.
//	L/R = Text from ltr/rtl.
//	F/R = Forward/Reverse Gematria.

var C = require('../config');
var D = require('./dict');
var G = require('./gematria');
var K = require('./keys');
var N = require('./numbers');
var _ = require('underscore');

var nt	= require('number-theory');

var E =
{
	/*
	*	Funktion: process()
	*
	*	Iterate through selectors, chunks, keys, chars.
	*	Shift chars by keys and return their latin representation.
	*
	*	@param	{array}
	*	@param	{integer}
	*	@return	{array}
	*/
	"process": function (chunks, iteration)
	{
		var tkeys = [], data = [], current;

		// Loop through Selectors
		for (var i = 0, ii = Object.keys(chunks).length; i < ii; i ++)
		{
			data[i] = [];
			tkeys[i] = [];
			current = chunks[Object.keys(chunks)[i]];

			// Loop through chunks. Chunks are strings.
			for (var j = 0, jj = current.chunks.length; j < jj; j ++)
			{
				// Will contain everything that gets echo'd later on.
				data[i][j] = [];

				// Will contain our (padded) keys.
				tkeys[i][j] = [];

				// <!-- -->
				// <!-- -->
				// <!-- -->

				// Add Futhark string to output.
				data[i][j].futhark = current.chunks[j].toString();

				var wordcount = data[i][j].futhark.replace(/[\s]/g, '').split('-').length;
				var charcount = data[i][j].futhark.replace(/[-\s]/g, '').length;

				// Add word/char count and char frequency to output.
				data[i][j].wordcount = wordcount;
				data[i][j].charcount = charcount;
				data[i][j].frequencies = N.frequency(_.without(current.chunks[j], '-'));

				// Adjust keylength to account for iterations
				if (!_.isNumber(iteration) || iteration < 1) iteration = 1;
				var keylen = charcount * iteration;

				// Add iteration to output.
				data[i][j].iteration = iteration;

				// Pad keys from K.keys to chunks length and add them to tkeys.
				if (K.keys.length > 0) for (var y = 0, yy = K.keys.length; y < yy; y ++ ) tkeys[i][j].push(K.pad(K.keys[y].slice(0), keylen));

				var key00 = N.integer(keylen);
				var key01 = N.prime(keylen);
				var key02 = N.stream(0, keylen);
				var key03 = N.pi(keylen);

				var key06 = [];
				for (var xx = 0; xx < key01.length; xx ++) key06.push(nt.eulerPhi(key01[xx]));

				tkeys[i][j].push(key06);

				// Rotate key full circle.
				//for (var z = 0; z < keylen; z ++) tkeys[i][j].push(K.rotate(key06.slice(0), z));

				//console.log(tkeys[i][j]);

				// <!-- -->
				// <!-- -->
				// <!-- -->

				// Loop through keys
				for (var k = 0, kk = tkeys[i][j].length; k < kk; k ++)
				{
					data[i][j][k] = [];
					data[i][j][k].dlf = [];
					data[i][j][k].dlr = [];
					data[i][j][k].ulf = [];
					data[i][j][k].ulr = [];
					data[i][j][k].dlf.chars = [];
					data[i][j][k].dlr.chars = [];
					data[i][j][k].ulf.chars = [];
					data[i][j][k].ulr.chars = [];
					data[i][j][k].key = tkeys[i][j][k].toString();

					// Loop through chars. m holds position in key.
					for (var l = 0, m = 0, ll = current.chunks[j].length; l < ll; l ++)
					{
						// Check if char should pass through unchanged.
						if (C.passthrough[current.chunks[j][l]])
						{
							data[i][j][k].dlf.chars[l] = current.chunks[j][l];
							data[i][j][k].dlr.chars[l] = current.chunks[j][l];
							data[i][j][k].ulf.chars[l] = current.chunks[j][l];
							data[i][j][k].ulr.chars[l] = current.chunks[j][l];
						}

						// Do shifting
						else
						{
							var shift = 0;

							// Calculate offset to account for iteration.
							if (iteration > 1) for (var it = 0; it < iteration; it ++) shift += tkeys[i][j][k][(m + (charcount * it))];
							else shift = tkeys[i][j][k][m];

							// Shift along a forward Gematria
							G.reset();

							data[i][j][k].ulf.chars[l] = G.shift(current.chunks[j][l], shift);
							data[i][j][k].dlf.chars[l] = G.shift(current.chunks[j][l], - shift);

							// Shift along a reversed Gematria
							G.reverse();

							data[i][j][k].ulr.chars[l] = G.shift(current.chunks[j][l], shift);
							data[i][j][k].dlr.chars[l] = G.shift(current.chunks[j][l], - shift);

							// Advance key
							m ++;
						}
					}

					// Make some room for words.
					data[i][j][k].ulf.words = [];
					data[i][j][k].dlf.words = [];
					data[i][j][k].ulr.words = [];
					data[i][j][k].dlr.words = [];

					// Make some room for word frequencies.
					data[i][j][k].ulf.frequency = [];
					data[i][j][k].dlf.frequency = [];
					data[i][j][k].ulr.frequency = [];
					data[i][j][k].dlr.frequency = [];

					// Reduce char array to word.
					var wordsulf = data[i][j][k].ulf.chars.join('').split('-');
					var wordsdlf = data[i][j][k].dlf.chars.join('').split('-');
					var wordsulr = data[i][j][k].ulr.chars.join('').split('-');
					var wordsdlr = data[i][j][k].dlr.chars.join('').split('-');

					// Word count should be all the same, so we just do one loop to look up words.
					for (var n = 0, nn = wordsulf.length; n < nn; n ++)
					{
						if ((D.find(wordsulf[n]))) data[i][j][k].ulf.words.push(wordsulf[n]);
						if ((D.find(wordsdlf[n]))) data[i][j][k].dlf.words.push(wordsdlf[n]);
						if ((D.find(wordsulr[n]))) data[i][j][k].ulr.words.push(wordsulr[n]);
						if ((D.find(wordsdlr[n]))) data[i][j][k].dlr.words.push(wordsdlr[n]);
					}

					// Word frequency count needs clean up and refactoring.
					// Count frequencies for: UP l FORWARD.
					if (data[i][j][k].ulf.words.length > 0)
					{
						var ulff = [], ulfword;
						for (var o = 0, oo = data[i][j][k].ulf.words.length; o < oo; o ++)
						{
							ulfword = data[i][j][k].ulf.words[o];
							ulff[ulfword] = ulff[ulfword] ? ulff[ulfword] + 1 : 1;
						}
						data[i][j][k].ulf.frequency = ulff;
					}

					// Count frequencies for: DOWN l FORWARD.
					if (data[i][j][k].dlf.words.length > 0)
					{
						var dlff = [], dlfword;
						for (var p = 0, pp = data[i][j][k].dlf.words.length; p < pp; p ++)
						{
							dlfword = data[i][j][k].dlf.words[p];
							dlff[dlfword] = dlff[dlfword] ? dlff[dlfword] + 1 : 1;
						}
						data[i][j][k].dlf.frequency = dlff;
					}

					// Count frequencies for: UP l REVERSED.
					if (data[i][j][k].ulr.words.length > 0)
					{
						var ulrf = [], ulrword;
						for (var q = 0, qq = data[i][j][k].ulr.words.length; q < qq; q ++)
						{
							ulrword = data[i][j][k].ulr.words[q];
							ulrf[ulrword] = ulrf[ulrword] ? ulrf[ulrword] + 1 : 1;
						}
						data[i][j][k].ulr.frequency = ulrf;
					}

					// Count frequencies for: DOWN l REVERSED.
					if (data[i][j][k].dlr.words.length > 0)
					{
						var dlrf = [], dlrword;
						for (var r = 0, rr = data[i][j][k].dlr.words.length; r < rr; r ++)
						{
							dlrword = data[i][j][k].dlr.words[r];
							dlrf[dlrword] = dlrf[dlrword] ? dlrf[dlrword] + 1 : 1;
						}
						data[i][j][k].dlr.frequency = dlrf;
					}

					//console.log(data[i][j][k]);

					// Calculate IoC of individual mutation.
					data[i][j][k].ulf.ioc = N.ioc(data[i][j][k].ulf.chars);
					data[i][j][k].dlf.ioc = N.ioc(data[i][j][k].dlf.chars);
					data[i][j][k].ulr.ioc = N.ioc(data[i][j][k].ulr.chars);
					data[i][j][k].dlr.ioc = N.ioc(data[i][j][k].dlr.chars);
				}
			}
		}

		return data;
	}
};

module.exports = E;