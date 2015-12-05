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
	"find": function (word)
	{
		if (!this.table) this.select(0, 6);
		if (this.table[word]) return true;
	},

	"select": function (minchar, maxchar, include, exclude)
	{
		if (!this.table) this.table = {};

		// Load file into buffer.
		var raw = F.readFileSync(C.dict.file, C.encoding);
		var data = [];

		// Check if there is data.
		if (typeof(raw) !== "string" || raw.length < 1) return;

		// Split raw by \n and remove empty items.
		raw = _.without(raw.split(/\n/), '');

		// Store word in table.
		for (var j = 0; j < raw.length; j ++) {this.table[raw[j].trim().toLowerCase()] = true;}

		/* way too fucking slow
		if (C.dict.minchar)
		{
			for (var l = 0; l < Object.keys(this.table).length; l ++)
			{
				if (Object.keys(this.table)[l].length <= C.dict.minchar) this.table[Object.keys(this.table)[l]] = false;
			}

			console.log(this.table);
		}
		*/

		// Explicitly include words from config.
		if (C.dict.include.length > 0) for (var i = 0; i < C.dict.include.length; i ++) this.table[C.dict.include[i]] = true;

		// Explicitly exclude words from config.
		if (C.dict.exclude.length > 0) for (var k = 0; k < C.dict.exclude.length; k ++) if (this.table[C.dict.exclude[k]]) this.table[C.dict.exclude[k]] = false;
	}
};

console.log(D.find('banana'));


module.exports = D;