/* jslint node: true */
'use strict';

//
//	Data
//

var C	= require('../config.js');
var F	= require('fs');
var _	= require('underscore');

var D =
{
	"get": function (what)
	{
		var raw = this.load();
		if (typeof(raw) !== "string" || raw.length < 1)	return;

		var rxWord = new RegExp('[&$\/%\s]', 'g');
		var rxClause = new RegExp('[&$\/%\s]', 'g');
		var rxParagraph = new RegExp('[$%\/\s]', 'g');
		var rxSegment = new RegExp('[&\/%\s]', 'g');
		var rxLine = new RegExp('[&$%\s]', 'g');
		var rxPage = new RegExp('[&$\/\s]', 'g');
		var rxDot = new RegExp('[.]', 'g');

		var getter =
		{
			"w": function () {return _.without(raw.replace(rxDot, C.delimiter.word).replace(rxWord, '').split(C.delimiter.word), undefined);},
			"c": function () {return _.without(raw.replace(rxClause, '').split(C.delimiter.clause), undefined);},
			"p": function () {return _.without(raw.replace(rxDot, C.delimiter.word).replace(rxParagraph, '').split(C.delimiter.paragraph), undefined);},
			"s": function () {return _.without(raw.replace(rxDot, C.delimiter.word).replace(rxSegment, '').split(C.delimiter.segment), undefined);},
			"l": function () {return _.without(raw.replace(rxDot, C.delimiter.word).replace(rxLine, '').split(C.delimiter.line), undefined);},
			"q": function () {return _.without(raw.replace(rxDot, C.delimiter.word).replace(rxPage, '').split(C.delimiter.page), undefined);},
		};

		var data = [], liber = [];
		var selector = Object.keys(what);
		var leni = selector.length;

		// Loop through selectors (w,c,p,s,l,q)
		for (var i = 0; i < leni; i ++)
		{
			data[selector[i]] = {};
			data[selector[i]].chunks = [];
			data[selector[i]].maxchar = 0;

			// Grab Liber by selector
			if (getter[selector[i]]) liber[i] = getter[selector[i]]();
			else continue;

			var lenj = what[selector[i]].length;

			// If no chunks were specified return all chunks
			if (lenj === 0) data[selector[i]].chunks = liber[i];

			else if (lenj > 0)
			{
				// Loop through specified chunks
				for (var j = 0; j < lenj; j ++)
				{
					var chunk = what[selector[i]][j];

					if (chunk > liber[i].length) continue;
					else data[selector[i]].chunks.push((liber[i].slice(chunk, chunk + 1).toString()));

				}
			}

			else continue;

			// Clean chunks of leading/trailing dashes and find length of longest chunk.
			for (var k = 0; k < data[selector[i]].chunks.length; k ++)
			{
				data[selector[i]].chunks[k] = data[selector[i]].chunks[k].replace(/\s/g, '').replace(/^-*|-*$/g, '');
				var strlen = data[selector[i]].chunks[k].replace(/-/g, '').length;
				//data[selector[i]].chunks[k].len = strlen;
				if(strlen > data[selector[i]].maxchar) data[selector[i]].maxchar = strlen;
			}
		}

		return data;
	},

	"load": function ()
	 {
	 	return F.readFileSync(C.raw, C.encoding);
	 }
};

module.exports = D;