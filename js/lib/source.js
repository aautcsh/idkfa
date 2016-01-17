/* jslint node: true */
'use strict';

//
//	Source
//
//

var C	= require('../config.js');
var F	= require('fs');
var _	= require('underscore');

var D =
{
	/*
	*	Funktion: get()
	*
	*	Will return the specified chunks of Liber.
	*
	*	@param: {Object} of selectors. {s:[0,3,12], c:[2], p:[]}. Empty array will select all.
	*	@return: [Array] of selected chunks as objects. [selector: {chunks: [chunk-1, chunk-n], maxchar: n}]
	*/
	"get": function (selectors)
	{
		var raw = F.readFileSync(C.raw, C.encoding);
		if (typeof(raw) !== "string" || raw.length < 1)	return;


		var rxWord = new RegExp('[&$§\/%\s]', 'g');
		var rxClause = new RegExp('[&$§\/%\s]', 'g');
		var rxParagraph = new RegExp('[$§\/%\s]', 'g');
		var rxSegment = new RegExp('[&§\/%\s]', 'g');
		var rxChapter = new RegExp('[&$\/%\s]', 'g');
		var rxLine = new RegExp('[&$§%\s]', 'g');
		var rxPage = new RegExp('[&$§\/\s]', 'g');
		var rxDot = new RegExp('[.]', 'g');

		var getter =
		{
			"w": function () {return _.without(raw.replace(rxDot, C.delimiter.word).replace(rxWord, '').split(C.delimiter.word), undefined);},
			"c": function () {return _.without(raw.replace(rxClause, '').split(C.delimiter.clause), undefined);},
			"p": function () {return _.without(raw.replace(rxDot, C.delimiter.word).replace(rxParagraph, '').split(C.delimiter.paragraph), undefined);},
			"x": function () {return _.without(raw.replace(rxDot, C.delimiter.word).replace(rxChapter, '').split(C.delimiter.chapter), undefined);},
			"s": function () {return _.without(raw.replace(rxDot, C.delimiter.word).replace(rxSegment, '').split(C.delimiter.segment), undefined);},
			"l": function () {return _.without(raw.replace(rxDot, C.delimiter.word).replace(rxLine, '').split(C.delimiter.line), undefined);},
			"q": function () {return _.without(raw.replace(rxDot, C.delimiter.word).replace(rxPage, '').split(C.delimiter.page), undefined);}
		};

		var data = [], liber = [];
		var selector = (selectors) ? Object.keys(selectors) : ['x'];

		// Loop through selectors (w, c, p, s, x, l, q)
		for (var i = 0, ii = selector.length; i < ii; i ++)
		{
			data[selector[i]] = {};
			data[selector[i]].chunks = [];

			// Grab Liber by selector
			if (getter[selector[i]]) liber[i] = _.without(getter[selector[i]](), '');
			else continue;

			// Remove not needed chunks.
			if (selectors[selector[i]].length > 0)
			{
				// Loop through specified chunks
				for (var j = 0, jj = selectors[selector[i]].length; j < jj; j ++)
				{
					var offset = selectors[selector[i]][j];

					if (offset > liber[i].length) continue;
					else data[selector[i]].chunks.push((liber[i].slice(offset, offset + 1).toString()));
				}
			}
			else data[selector[i]].chunks = liber[i];

			// Clean chunks of leading/trailing dashes and control chars.
			for (var k = 0; k < data[selector[i]].chunks.length; k ++) data[selector[i]].chunks[k] = data[selector[i]].chunks[k].replace(/\s/g, '').replace(/^-*|-*$/g, '');
		}

		return data;
	}
};

module.exports = D;