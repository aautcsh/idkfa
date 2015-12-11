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
	/*
	*	Funktion: get()
	*
	*	Will return the specified OEIS entries.
	*
	*	Note: Results are sanitized then sanity checked.
	*	Note: Querries will return less results than expected in most cases.
	*
	*	@param: String will select one sequence. 'A007583'
	*	@param: Array will select multiple specific sequences. ['A264669', 'A264658']
	*	@param: Range will select multiple sequences. (0, 1000)
	*	@return: [Array] of sequences. [{'A264669': [0,1,2,3]}, {'A264658': [4,5,6]}]
	*/
	"get": function (sequence)
	{
		this.table = this.load();
		var seq = [], clean = [];

		// Handle param = array.
		if (_.isArray(sequence)) for (var i = 0; i < sequence.length; i ++) seq.push(this.table[sequence[i]]);

		// Handle param = string.
		else if (_.isString(sequence)) seq.push(this.table[sequence]);

		// Handle param = range.
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
		return (clean.length < seq.length) ? [clean, -1] : [clean];
	},

	/*
	*
	*	Function: check()
	*
	*	Check sequence for sane values
	*
	*	Param: [Array] of numbers
	*	Return: Boolean
	*
	*/
	"check": function (sequence)
	{
		for (var i = 0; i < sequence.length; i ++)
		{
			if (sequence[i] < C.oeis.minvalue || sequence[i] > C.oeis.maxvalue) return false;
		}

		return true;
	},

	/*
	*
	*	Function: load()
	*
	*	Loads all OEIS entries from file, then deletes sequences that would break JSON.parse()
	*
	*	Note: Will not return all results from file.
	*
	*	Return: [Array] of (almost) all OEIS entries. [{'A000001': [0,1,2,3]}, {'A000002': [4,5,6]}]
	*
	*/
	"load": function ()
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

		return data;
	}
};

//var foo = O.select(1);
//var foo = O.select(['A264669', 'A264658']);
//console.log(foo);

module.exports = O;