/* jslint node: true */
'use strict';

//
//	Engine
//
//	Array Keys: U/D = Shift up/down Gematria.
//	Array Keys: L/R = Text from ltr/rtl.
//	Array Keys: F/R = Forward/Reverse Gematria.

var C = require('../config');
var D = require('./dict');
var G = require('./gematria');
var K = require('./keys');
var N = require('./numbers');
var _ = require('underscore');

var E =
{
	/*
	*	Funktion: process()
	*
	*	Magic happening here
	*
	*	@param:
	*	@param:
	*	@return:
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

			// To shift the same letter n times along a continous key stream we need a longer key stream
			// E.g. iterate twice: Letter: ABC, Key: 1,2,3,4,5,6. Shift A->1, B->2, C->3, A->4, B->5, C->6
			// This translates to shift: A->5, B->7, C->9
			if (!_.isNumber(iteration) || iteration < 1) iteration = 1;
			current.maxchar = current.maxchar * iteration;


			// Build some test keys
			// Need to move this some place else
			var key01 = N.prime(current.maxchar);
			var key02 = N.phi(current.maxchar);
			var key03 = N.map(key01, key02, 's', 0);
			var key04 = N.map(key01, key02, 'd', 0);
			var key05 = N.map(key01, key02, 'p', 0);
			//var key06 = N.map(key01, key02, 'm', 0);
			var key07 = N.weave(key01, key02);
			//var key08 = N.stream(0, current.maxchar);
			var key09 = N.map(key01, N.stream(0, current.maxchar), 's', - 1);

			tkeys[i].push(key09);

			//console.log(tkeys);

			// Pad keys to current chunks maxchar.
			for (var y = 0, yy = K.keys.length; y < yy; y ++) tkeys[i].push(K.pad(K.keys[y], current.maxchar));

			//console.log(tkeys);

			// Loop through chunks
			for (var j = 0, jj = current.chunks.length; j < jj; j ++)
			{
				data[i][j] = [];

				// Pass the Futhork string through unchanged so we can display it later on.
				data[i][j].futhark = current.chunks[j].toString();

				var charlen = data[i][j].futhark.replace(/[-\s]/g, '').length;

				// Loop through keys
				for (var k = 0, kk = tkeys[i].length; k < kk; k ++)
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

					// Loop through chars
					for (var l = 0, ll = current.chunks[j].length, m = 0; l < ll; l ++)
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

							// Calculate offset if we have an iteration > 1.
							if (iteration > 1) for (var it = 0; it < iteration; it ++) shift += tkeys[i][k][it * charlen + m];
							else shift = tkeys[i][k][m];

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