/* jslint node: true */
'use strict';

//
//	Engine
//

var C = require('../config');
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

			// Add keys to key pool.
			for (var x = 0; x < keys.length; x ++) K.add(keys[x]);

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
						// Handle word delimiter
						if (current.chunks[j][l] === '-')
						{
							data[i][j][k].dltrf.chars[l] = '-';
							data[i][j][k].dltrr.chars[l] = '-';
							data[i][j][k].ultrf.chars[l] = '-';
							data[i][j][k].ultrr.chars[l] = '-';
						}

						// Handle clear text F
						else if (current.chunks[j][l] === 'F')
						{
							data[i][j][k].dltrf.chars[l] = 'F';
							data[i][j][k].dltrr.chars[l] = 'F';
							data[i][j][k].ultrf.chars[l] = 'F';
							data[i][j][k].ultrr.chars[l] = 'F';
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

					// Calculate IoC of individual mutation.
					data[i][j][k].dltrf.ioc = N.ioc(data[i][j][k].dltrf.chars);
					data[i][j][k].dltrr.ioc = N.ioc(data[i][j][k].dltrr.chars);
					data[i][j][k].ultrf.ioc = N.ioc(data[i][j][k].ultrf.chars);
					data[i][j][k].ultrr.ioc = N.ioc(data[i][j][k].ultrr.chars);
				}
			}
		}

		return data;
	}
};

module.exports = E;