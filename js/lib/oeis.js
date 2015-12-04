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
	"select": function (config)
	{
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
		for(var x = 0; x < raw.length; x ++)
		{
			var current = Object.keys(raw[x])[0];
			if (!data[current]) data[current] = raw[x][Object.keys(raw[x])[0]];
		}

		// Return data and data.length.
		return [data, Object.keys(data).length];
	}
};

module.exports = O;