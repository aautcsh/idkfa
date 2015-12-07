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
		var i, j, k, l, m;
		var tkeys = [], current, data = [];
		var selectors = Object.keys(chunks).length;

		// Loop through Selectors
		for (i = 0; i < selectors; i ++)
		{
			data[i] = [];
			tkeys[i] = [];
			current = chunks[Object.keys(chunks)[i]];

			// Add keys from config or [0] to add an iteration with no shift.
			if (C.keys.length > 0) for (var w = 0; w < C.keys.length; w ++ ) K.add(C.keys[w]);
			else K.add([0]);

			// Pad keys to current chunks maxchar.
			for (var y = 0; y < K.keys.length; y ++) tkeys[i].push(K.pad(K.keys[y], current.maxchar));

			// Loop through chunks
			for (j = 0; j < current.chunks.length; j ++)
			{
				data[i][j] = [];

				// Pass the Futhork string through unchanged so we can display it later on.
				data[i][j].futhark = current.chunks[j].toString();

				// Loop through keys
				for (k = 0; k < tkeys[i].length; k ++)
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
					for (l = 0, m = 0; l < current.chunks[j].length; l ++)
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
					for (var aa = 0; aa < wordsultrf.length; aa ++)
					{
						if ((D.find(wordsultrf[aa]))) data[i][j][k].ultrf.words.push(wordsultrf[aa]);
						if ((D.find(wordsdltrf[aa]))) data[i][j][k].dltrf.words.push(wordsdltrf[aa]);
						if ((D.find(wordsultrr[aa]))) data[i][j][k].ultrr.words.push(wordsultrr[aa]);
						if ((D.find(wordsdltrr[aa]))) data[i][j][k].dltrr.words.push(wordsdltrr[aa]);
					}

					//console.log(data[i][j][k].ultrf.words, data[i][j][k].dltrf.words, data[i][j][k].ultrr.words, data[i][j][k].dltrr.words);

					// Count frequencies for: UP LTR FORWARD.
					if (data[i][j][k].ultrf.words.length > 0)
					{
						var ultrff = [], ultrfword;
						for (var ii = 0; ii < data[i][j][k].ultrf.words.length; ii ++)
						{
							ultrfword = data[i][j][k].ultrf.words[ii];
							ultrff[ultrfword] = ultrff[ultrfword] ? ultrff[ultrfword] + 1 : 1;
						}
						data[i][j][k].ultrf.frequency = ultrff;
					}

					// Count frequencies for: DOWN LTR FORWARD.
					if (data[i][j][k].dltrf.words.length > 0)
					{
						var dltrff = [], dltrfword;
						for (var jj = 0; jj < data[i][j][k].dltrf.words.length; jj ++)
						{
							dltrfword = data[i][j][k].dltrf.words[jj];
							dltrff[dltrfword] = dltrff[dltrfword] ? dltrff[dltrfword] + 1 : 1;
						}
						data[i][j][k].dltrf.frequency = dltrff;
					}

					// Count frequencies for: UP LTR REVERSED.
					if (data[i][j][k].ultrr.words.length > 0)
					{
						var ultrrf = [], ultrrword;
						for (var kk = 0; kk < data[i][j][k].ultrr.words.length; kk ++)
						{
							ultrrword = data[i][j][k].ultrr.words[kk];
							ultrrf[ultrrword] = ultrrf[ultrrword] ? ultrrf[ultrrword] + 1 : 1;
						}
						data[i][j][k].ultrr.frequency = ultrrf;
					}

					// Count frequencies for: DOWN LTR REVERSED.
					if (data[i][j][k].dltrr.words.length > 0)
					{
						var dltrrf = [], dltrrword;
						for (var ll = 0; ll < data[i][j][k].dltrr.words.length; ll ++)
						{
							dltrrword = data[i][j][k].dltrr.words[ll];
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