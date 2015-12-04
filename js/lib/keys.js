/* jslint node: true */
'use strict';

//
//	Keys
//

var _ = require('underscore');

var K =
{
	// Holds Gematria offsets of individual chars, tri-graphs, bi-graphs.
	"table": [{'F': 1}, {'U': 2}, {'V': 2}, {'TH': 3}, {'O': 4}, {'R': 5}, {'C': 6}, {'K': 6}, {'G': 7}, {'W': 8}, {'H': 9}, {'N': 10}, {'I': 11}, {'J': 12}, {'EO': 13}, {'P': 14}, {'X': 15}, {'S': 16}, {'Z': 16}, {'T': 17}, {'B': 18}, {'E': 19}, {'M': 20}, {'L': 21}, {'NG': 22}, {'ING': 22}, {'OE': 23}, {'D': 24}, {'A': 25}, {'AE': 26}, {'Y': 27}, {'IA': 28}, {'IO': 28}, {'EA': 29}],

	"add": function (key)
	{
		if (!this.keys) this.keys = [];
		if (_.isArray(key) && key.length > 0) this.addArray(key);
		else if (_.isString(key) && key.length > 0) this.addString(key);
		else return;
	},

	"addArray": function (key) {this.keys.push(key);},

	"addString": function (key)
	{
		// Turn string into array of forward (and reversed) Gematria offsets.
		// First Pick up Tri-Graphs (ING).
		// Then Bi-Graphs (TH/EO/NG/OE/AE/IA/IO/EA).
		// Then single chars.

		var graphs = [3, 2, 1];
		var keylen = key.length;
		var i, j, k, max, graph, tmp = [], rkey = [];

		for (i = 0; i < graphs.length; i ++)
		{
			max = keylen - graphs[i];

			// Build graphs
			for (j = 0; j <= max; j ++ )
			{
				graph = key.substr(j, graphs[i]).toUpperCase();

				// Search Gematria for graphs
				for (k = 0; k < this.table.length; k ++)
				{
					// If we got a match add graph to tmp array and blank its position in key.
					if (this.table[k][graph])
					{
						tmp[j] = this.table[k][graph];
						key = this.blank(key, j, graphs[i]);
					}
				}
			}
		}

		// Remove empty elements.
		key = _.without(tmp, undefined);

		// Reverse offsets.
		for (var x = 0; x < key.length; x ++) rkey.push((30 - key[x] === 30) ? 0 : 30 - key[x]);

		this.keys.push(key);
		this.keys.push(rkey);

	},

	"blank": function (string, start, offset)
	{
		var blank = '';
		var end = offset + start;
		var pre = string.substr(0, start);
		var post = string.substr(end);

		while (offset --) blank += '0';
		return pre + blank + post;
	},

	"pad": function (key, char, length)
	{
		//console.log(key);
		// If there is no key return.
		if (!_.isArray(key) || key.length < 1) return;

		// If only 2 args are passed assume 2nd is length and pad key with itself.
		if (arguments.length < 3) {length = char; char = [];}

		//console.log('length: ' + length);

		// If char = number or string pad key with it.
		if (_.isString(char) || _.isNumber(char)) {if (_.isString(char) && char.length > 1) char = char.substring(0, 1); while (key.length < length) key.push(char);}

		// Else pad key with itself.
		else {var keylen = key.length; for (var i = 0; i < length - keylen; i ++) key.push(key[i]);}

		//console.log(key);

		return key;
	}
};

//K.add();
//K.add([1,2,3,4,5]);
//K.add('abc');
//K.add('FIRFUMFERENFE');
//console.log(K.keys);

module.exports = K;