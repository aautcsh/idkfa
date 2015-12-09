/* jslint node: true */
'use strict';

//
//	Engine
//
//	Array Keys: U/D		= Shift UP/DOWN Gematria.
//	Array Keys: LTR/RTL = Key from LTR/RTL of text.
//	Array Keys: F/R		= Using a FORWARD/REVERSED Gematria.

var C = require('../config');
var D = require('./dict');
var G = require('./gematria');
var K = require('./keys');
var N = require('./numbers');
var _ = require('underscore');

var E =
{
	"process": function (chunks, keys)
	{
		var tkeys = [], data = [], current;

		// Loop through Selectors
		for (var i = 0, ii = Object.keys(chunks).length; i < ii; i ++)
		{
			data[i] = [];
			tkeys[i] = [];
			current = chunks[Object.keys(chunks)[i]];


			// Need to move this some place else
			var key01 = N.prime(current.maxchar);
			var key02 = N.phi(current.maxchar);
			var key03 = N.map(key01, N.stream(0, current.maxchar), 'p');
			var key04 = N.weave(key02, key01);

			tkeys[i].push(key01);

			// Add keys from config or [0] to add an iteration with no shift.
			if (C.keys.length > 0) for (var w = 0, ww = C.keys.length; w < ww; w ++ ) K.add(C.keys[w]);
			if (!K.keys) K.add([0]);

			// Pad keys to current chunks maxchar.
			for (var y = 0, yy = K.keys.length; y < yy; y ++) tkeys[i].push(K.pad(K.keys[y], current.maxchar));


			// Loop through chunks
			for (var j = 0, jj = current.chunks.length; j < jj; j ++)
			{
				data[i][j] = [];

				// Pass the Futhork string through unchanged so we can display it later on.
				data[i][j].futhark = current.chunks[j].toString();

				// Loop through keys
				for (var k = 0, kk = tkeys[i].length; k < kk; k ++)
				{
					data[i][j][k] = [];
					data[i][j][k].dltrf = [];
					data[i][j][k].dltrr = [];
					data[i][j][k].ultrf = [];
					data[i][j][k].ultrr = [];
					data[i][j][k].dltrf.chars = [];
					data[i][j][k].dltrr.chars = [];
					data[i][j][k].ultrf.chars = [];
					data[i][j][k].ultrr.chars = [];

					// Loop through chars
					for (var l = 0, ll = current.chunks[j].length, m = 0; l < ll; l ++)
					{
						// Check if char should pass through unchanged.
						if (C.passthrough[current.chunks[j][l]])
						{
							data[i][j][k].dltrf.chars[l] = current.chunks[j][l];
							data[i][j][k].dltrr.chars[l] = current.chunks[j][l];
							data[i][j][k].ultrf.chars[l] = current.chunks[j][l];
							data[i][j][k].ultrr.chars[l] = current.chunks[j][l];
						}

						// Do shifting
						else
						{
							// Shift along a forward Gematria
							G.reset();

							data[i][j][k].ultrf.chars[l] = G.shift(current.chunks[j][l], tkeys[i][k][m]);
							data[i][j][k].dltrf.chars[l] = G.shift(current.chunks[j][l], - tkeys[i][k][m]);

							// Shift along a reversed Gematria
							G.reverse();

							data[i][j][k].ultrr.chars[l] = G.shift(current.chunks[j][l], tkeys[i][k][m]);
							data[i][j][k].dltrr.chars[l] = G.shift(current.chunks[j][l], - tkeys[i][k][m]);

							// Advance key
							m ++;
						}
					}

					// Make some room for words.
					data[i][j][k].ultrf.words = [];
					data[i][j][k].dltrf.words = [];
					data[i][j][k].ultrr.words = [];
					data[i][j][k].dltrr.words = [];

					// Make some room for word frequencies.
					data[i][j][k].ultrf.frequency = [];
					data[i][j][k].dltrf.frequency = [];
					data[i][j][k].ultrr.frequency = [];
					data[i][j][k].dltrr.frequency = [];

					// Reduce char array to word.
					var wordsultrf = data[i][j][k].ultrf.chars.join('').split('-');
					var wordsdltrf = data[i][j][k].dltrf.chars.join('').split('-');
					var wordsultrr = data[i][j][k].ultrr.chars.join('').split('-');
					var wordsdltrr = data[i][j][k].dltrr.chars.join('').split('-');

					// Word count should be all the same, so we just do 1 loop to look up words.
					for (var n = 0, nn = wordsultrf.length; n < nn; n ++)
					{
						if ((D.find(wordsultrf[n]))) data[i][j][k].ultrf.words.push(wordsultrf[n]);
						if ((D.find(wordsdltrf[n]))) data[i][j][k].dltrf.words.push(wordsdltrf[n]);
						if ((D.find(wordsultrr[n]))) data[i][j][k].ultrr.words.push(wordsultrr[n]);
						if ((D.find(wordsdltrr[n]))) data[i][j][k].dltrr.words.push(wordsdltrr[n]);
					}

					//console.log(data[i][j][k].ultrf.words, data[i][j][k].dltrf.words, data[i][j][k].ultrr.words, data[i][j][k].dltrr.words);

					// Count frequencies for: UP LTR FORWARD.
					if (data[i][j][k].ultrf.words.length > 0)
					{
						var ultrff = [], ultrfword;
						for (var o = 0, oo = data[i][j][k].ultrf.words.length; o < oo; o ++)
						{
							ultrfword = data[i][j][k].ultrf.words[o];
							ultrff[ultrfword] = ultrff[ultrfword] ? ultrff[ultrfword] + 1 : 1;
						}
						data[i][j][k].ultrf.frequency = ultrff;
					}

					// Count frequencies for: DOWN LTR FORWARD.
					if (data[i][j][k].dltrf.words.length > 0)
					{
						var dltrff = [], dltrfword;
						for (var p = 0, pp = data[i][j][k].dltrf.words.length; p < pp; p ++)
						{
							dltrfword = data[i][j][k].dltrf.words[p];
							dltrff[dltrfword] = dltrff[dltrfword] ? dltrff[dltrfword] + 1 : 1;
						}
						data[i][j][k].dltrf.frequency = dltrff;
					}

					// Count frequencies for: UP LTR REVERSED.
					if (data[i][j][k].ultrr.words.length > 0)
					{
						var ultrrf = [], ultrrword;
						for (var q = 0, qq = data[i][j][k].ultrr.words.length; q < qq; q ++)
						{
							ultrrword = data[i][j][k].ultrr.words[q];
							ultrrf[ultrrword] = ultrrf[ultrrword] ? ultrrf[ultrrword] + 1 : 1;
						}
						data[i][j][k].ultrr.frequency = ultrrf;
					}

					// Count frequencies for: DOWN LTR REVERSED.
					if (data[i][j][k].dltrr.words.length > 0)
					{
						var dltrrf = [], dltrrword;
						for (var r = 0, rr = data[i][j][k].dltrr.words.length; r < rr; r ++)
						{
							dltrrword = data[i][j][k].dltrr.words[r];
							dltrrf[dltrrword] = dltrrf[dltrrword] ? dltrrf[dltrrword] + 1 : 1;
						}
						data[i][j][k].dltrr.frequency = dltrrf;
					}

					// Calculate IoC of individual mutation.
					data[i][j][k].ultrf.ioc = N.ioc(data[i][j][k].ultrf.chars);
					data[i][j][k].dltrf.ioc = N.ioc(data[i][j][k].dltrf.chars);
					data[i][j][k].ultrr.ioc = N.ioc(data[i][j][k].ultrr.chars);
					data[i][j][k].dltrr.ioc = N.ioc(data[i][j][k].dltrr.chars);
				}
			}
		}

		//console.log(data[0][0][0]);

		return data;
	}
};

module.exports = E;