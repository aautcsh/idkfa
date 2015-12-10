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
		if (this.table[word] === true) return true;
	},

	"select": function (minchar, maxchar, include, exclude)
	{
		if (!this.table) this.table = {};

		// Load file into buffer.
		//console.log('Read file!');
		var raw = F.readFileSync(C.dict.file, C.encoding);
		var data = [];

		// Check if there is data.
		if (typeof(raw) !== "string" || raw.length < 1) return;

		// Split raw by \n and remove empty items.
		raw = _.without(raw.split(/\n/), '');

		// Store word in table.
		for (var i = 0, ii = raw.length; i < ii; i ++) {this.table[raw[i].trim().toUpperCase()] = true;}

		/* too slow
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
		if (C.dict.include.length > 0) for (var x = 0, xx = C.dict.include.length; x < xx; x ++) this.table[C.dict.include[x].toUpperCase()] = true;

		// Explicitly exclude words from config.
		if (C.dict.exclude.length > 0) for (var y = 0, yy = C.dict.exclude.length; y < yy; y ++) if (this.table[C.dict.exclude[y].toUpperCase()]) this.table[C.dict.exclude[y].toUpperCase()] = false;
	}
};

//console.log(D.find('banana'));

module.exports = D;