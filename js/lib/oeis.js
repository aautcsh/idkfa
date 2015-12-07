/* jslint node: true */
'use strict';

//
//	OEIS
//

var C = require('../config');
var F = require('fs');
var _ = require('underscore');

var O =
{
	"select": function (sequence)
	{
		var data = this.load();
		var seq = [], clean = [];

		// Handle array.
		if (_.isArray(sequence)) for (var i = 0; i < sequence.length; i ++) seq.push(this.table[sequence[i]]);

		// Handle String.
		else if (_.isString(sequence)) seq.push(this.table[sequence]);

		// Handle range.
		else if (_.isNumber(Math.floor(arguments[0])) && _.isNumber(Math.floor(arguments[1])))
		{
			var keys = Object.keys(this.table);

			// Calculate sane offsets.
			if (!arguments[1]) arguments[1] = arguments[0] + 1;
			if (arguments[1] <= arguments[0] || arguments[1] > keys.length) arguments[1] = keys.length;
			if (arguments[0] < 0 || arguments[0] >= keys.length) arguments[0] = arguments[1] - 1;
			for (var j = arguments[0]; j < arguments[1]; j ++) seq.push(this.table[keys[j]]);
		}

		// Do some sanitation.
		for (var k = 0; k < seq.length; k ++) if (seq[k].length > C.oeis.minlength && this.check(seq[k])) clean.push(seq[k]);

		// If sequences were filtered pass along -1 so we can react to it.
		return (clean.length < seq.length) ? [clean, -1] : clean;
	},

	"check": function (sequence)
	{
		for (var i = 0; i < sequence.length; i ++)
		{
			if (sequence[i] < C.oeis.minvalue || sequence[i] > C.oeis.maxvalue) return false;
		}

		return true;
	},

	"load": function (config)
	{
		if(!this.table) this.table = [];

		// Load file into buffer.
		var raw = F.readFileSync(C.oeis.file, C.encoding);
		var data = [];

		// Check if there is data.
		if (typeof(raw) !== "string" || raw.length < 1) return;

		// Split raw by \n and remove empty items.
		raw = _.without(raw.split(/\n/), '');

		// Do some more sanitation.
		for(var i = 0; i < raw.length; i ++)
		{
			// If sequence contains anything that will break JSON.parse() delete the whole sequence.
			if(raw[i].match(/[^0-9,{}\[\]:"-A]/g)) delete raw[i];
			// Else parse string.
			else raw[i] = JSON.parse(raw[i]);
		}

		// Remove empty items.
		raw = _.without(raw, undefined);

		// Remove duplicate items (just in case ;))
		for(var j = 0; j < raw.length; j ++)
		{
			var current = Object.keys(raw[j])[0];
			//console.log(current);

			if (!data[current]) data[current] = raw[j][Object.keys(raw[j])[0]];
		}

		this.table = data;
	}
};

//var foo = O.select(1);
//var foo = O.select(['A264669', 'A264658']);
//console.log(foo);

module.exports = O;