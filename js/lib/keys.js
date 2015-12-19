/* jslint node: true */
'use strict';

//
//	Keys
//

var _ = require('underscore');

var K =
{
	/*
	*	Holds Gematria offsets of individual chars, bi-graphs, tri-graphs.
	*/
	"table": [{'F': 1}, {'U': 2}, {'V': 2}, {'TH': 3}, {'O': 4}, {'R': 5}, {'C': 6}, {'K': 6}, {'G': 7}, {'W': 8}, {'H': 9}, {'N': 10}, {'I': 11}, {'J': 12}, {'EO': 13}, {'P': 14}, {'X': 15}, {'S': 16}, {'Z': 16}, {'T': 17}, {'B': 18}, {'E': 19}, {'M': 20}, {'L': 21}, {'NG': 22}, {'ING': 22}, {'OE': 23}, {'D': 24}, {'A': 25}, {'AE': 26}, {'Y': 27}, {'IA': 28}, {'IO': 28}, {'EA': 29}],

	/*
	*	Wrapper for addArray() and addString().
	*
	*	If key is an array of integers, values are interpreted as relative Gematria offsets.
	*	If key is a string it will be converted to absolute Gematria offsets.
	*
	*	@param	{array | string}	key			[[0-9]] | [a-zA-Z]
	*	@param	{boolean}			direction	0 = forward Gematria, 1 = reverse Gematria. Default: 0
	*	@return {void}
	*/
	"add": function (key, direction)
	{
		if (!key.length || key.length < 1) return;
		if (!direction) direction = 0;
		if (!this.keys) this.keys = [];

		if (_.isArray(key)) this.addArray(key, direction);
		else if (_.isString(key)) this.addString(key, direction);
		else return;
	},

	/*
	*	Add array to keys array.
	*
	*	If array is a list of integers add it to keys array.
	*
	*	@param	{array}				key			[0-9]
	*	@param	{boolean}			direction	0 = forward Gematria, 1 = reverse Gematria. Default: 0
	*	@return {void}
	*/
	"addArray": function (key, direction)
	{
		// Check if array contains only numbers.
		_.each(key, function (item, el)
		{
			if (!_.isNumber(item)) key[el] = 0;
			else key[el] = Math.floor(item);
		});

		// Reverse offsets if needed.
		if (direction === 1) key = this.reverse(key);

		this.keys.push(key);
	},

	/*
	*	Turn string into array of Gematria offsets and add it to the keys array.
	*	First Pick up Tri-Graphs (ING). Then Bi-Graphs (TH/EO/NG/OE/AE/IA/IO/EA). Then single chars.
	*
	*	@param	{string}			key			[a-zA-Z]
	*	@param	{boolean}			direction	0 = forward Gematria, 1 = reverse Gematria. Default: 0
	*	@return {void}
	*/
	"addString": function (key, direction)
	{
		var graphs = [3, 2, 1];
		var keylen = key.length;
		var tmp = [];

		for (var i = 0, ii = graphs.length; i < ii; i ++)
		{
			// Loop through graphs
			for (var j = 0, jj = keylen - graphs[i]; j <= jj; j ++)
			{
				// Build graph
				var graph = key.substr(j, graphs[i]).toUpperCase();

				// Search Gematria for graph
				for (var k = 0, kk = this.table.length; k < kk; k ++)
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

		// Reverse offsets if needed.
		if (direction === 1) key = this.reverse(key);

		this.keys.push(key);
	},

	/*
	*	Blank chars that have been picked up so they don't get picked up twice.
	*
	*	@param	{string}			string		[a-zA-Z]
	*	@param	{integer}			start		First letter to blank. Default: 0
	*	@param	{integer}			offset		How many letters to blank. Default: 0
	*	@return {void}
	*/
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
	},

	/*
	*	Pad key to length.
	*
	*
	*	@return {array}
	*/
	"pad": function (key, char, length)
	{
		// If there is no key return.
		if (!_.isArray(key) || key.length < 1) return;

		// If only 2 args are passed assume 2nd is length and pad key with itself.
		if (arguments.length < 3) {length = char; char = [];}

		// If char = number or string pad key with it.
		if (_.isString(char) || _.isNumber(char)) {if (_.isString(char) && char.length > 1) char = char.substring(0, 1); while (key.length < length) key.push(char);}

		// Else pad key with itself.
		else {var keylen = key.length; for (var i = 0; i < length - keylen; i ++) key.push(key[i]);}

		return key;
	},

	/*
	*	Reverse offsets.
	*
	*
	*	@return {array}
	*/
	"reverse": function (key)
	{

		var maxoffset = 30;

		_.each(key, function (item, el)
		{
			if (key[el] === 0) key[el] = 0;
			else key[el] = maxoffset - key[el];

		});

		return key;
	}
};

module.exports = K;