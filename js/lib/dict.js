/* jslint node: true */
'use strict';

//
//	Dict
//

var C = require('../config');
var F = require('fs');
var _ = require('underscore');

var D =
{
	"table":
	[
		{"F": "F"},
		{"U": "UV"},
		{"V": "UV"},
		{"TH": "TH"},
		{"O": "O"},
		{"R": "R"},
		{"C": "CK"},
		{"K": "CK"},
		{"G": "G"},
		{"W": "W"},
		{"H": "H"},
		{"N": "N"},
		{"I": "I"},
		{"J": "J"},
		{"EO": "EO"},
		{"P": "P"},
		{"X": "X"},
		{"S": "SZ"},
		{"Z": "SZ"},
		{"T": "T"},
		{"B": "B"},
		{"E": "E"},
		{"M": "M"},
		{"L": "L"},
		{"NG": "NGING"},
		{"ING": "NGING"},
		{"OE": "OE"},
		{"D": "D"},
		{"A": "A"},
		{"AE": "AE"},
		{"Y": "Y"},
		{"IA": "IAIO"},
		{"IO": "IAIO"},
		{"EA": "EA"}
	],

	"find": function (word)
	{
		if (!this.dict) this.select();
		if (this.dict[word] === true) return true;
	},

	"select": function (normalize)
	{
		if (!this.dict) this.dict = {};
		if (!normalize) normalize = 1;

		// Load file into buffer.
		var raw = F.readFileSync(C.dict.file, C.encoding);

		// Check if there is data.
		if (!_.isString(raw) || raw.length < 1) return;

		// Split raw by \n and remove empty items.
		raw = _.without(raw.split(/\n/), '');

		// Normalize dict to match expected output (WIS/ZDOM)
		if (normalize === 1) for (var i = 0, ii = raw.length; i < ii; i ++) raw[i] = this.normalize(raw[i]);

		// Store word in table.
		for (var j = 0, jj = raw.length; j < jj; j ++) {this.dict[raw[j].trim().toUpperCase()] = true;}

		// Explicitly include words from config.
		if (C.dict.include.length > 0) for (var x = 0, xx = C.dict.include.length; x < xx; x ++) this.dict[C.dict.include[x].toUpperCase()] = true;

		// Explicitly exclude words from config.
		if (C.dict.exclude.length > 0) for (var y = 0, yy = C.dict.exclude.length; y < yy; y ++) if (this.dict[C.dict.exclude[y].toUpperCase()]) this.dict[C.dict.exclude[y].toUpperCase()] = false;
	},

	"normalize": function (string)
	{
		var graphs = [3, 2, 1];
		var strlen = string.length;
		var tmp = [];

		for (var i = 0, ii = graphs.length; i < ii; i ++)
		{
			// Loop through graphs
			for (var j = 0, jj = strlen - graphs[i]; j <= jj; j ++)
			{
				// Build graph
				var graph = string.substr(j, graphs[i]).toUpperCase();

				// Search Gematria for graph
				for (var k = 0, kk = this.table.length; k < kk; k ++)
				{
					// If we got a match add graph to tmp array and blank its position in key.
					if (this.table[k][graph])
					{
						tmp[j] = this.table[k][graph];
						string = this.blank(string, j, graphs[i]);
					}
				}
			}
		}

		return tmp.join('');
	},

	"blank": function (string, start, offset)
	{
		if (!start) start = 0;
		if (!offset) offset = 0;

		var blank = '';
		var end = offset + start;
		var pre = string.substr(0, start);
		var post = string.substr(end);

		while (offset --) blank += '0';
		return pre + blank + post;
	}
};

//console.log(D.normalize('construction'));
//console.log(D.find('banana'));

module.exports = D;