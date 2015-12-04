/* jslint node: true */
'use strict';

//
//	Data
//

var cnf	= require('../config.js');
var fnc	= require('./functions.js');
var fs	= require('fs');
var _	= require('underscore');

var D =
{
	"select": function(chunks)
	{
		// Load Liber Primus into buffer.
		var raw = fs.readFileSync(cnf.raw, cnf.encoding);

		// Check if there is data in Liber Primus
		if (typeof(raw) !== "string" || raw.length < 1)
		{
			console.log('Error: File "' + cnf.raw + '" contains no data.');
			return;
		}

		// Selectors to return chunks of data.
		var selectors =
		{
			"w": function() {return raw.replace(/[.]/g, '-').replace(/[&$\/%\s]/g, '').split('-').noempty();},	// word
			"c": function() {return raw.replace(/[&$\/%\s]/g, '').split('.').noempty();},						// clause
			"p": function() {return raw.replace(/[.]/g, '-').replace(/[$%\/\s]/g, '').split('&').noempty();},	// paragraph
			"s": function() {return raw.replace(/[.]/g, '-').replace(/[&\/%\s]/g, '').split('$').noempty();},	// section
			"l": function() {return raw.replace(/[.]/g, '-').replace(/[&$%\s]/g, '').split('/').noempty();},	// line
			"q": function() {return raw.replace(/[.]/g, '-').replace(/[&$\/\s]/g, '').split('%').noempty();}	// page
		};

		// Will hold selected chunks
		var data = [];
		var all = [];

		// Loop through chunks
		for(var i in chunks)
		{
			if (selectors.hasOwnProperty(i))
			{
				// Get data.
				data[i] = [];
				data[i].maxchar = 0;
				data[i].chunks = [];
				all[i] = selectors[i]();

				// Strip data of unneeded chunks.
				if (chunks[i].length === 0)
				{
					data[i].chunks = all[i];
				}

				else if(chunks[i].length > 0)
				{
					for (var j = 0; j < chunks[i].length; j ++)
					{
						if(chunks[i][j] > all[i].length)
						{
							console.log('Warning: Chunk specified > total chunks. Skipping: ' + i + ' ' + chunks[i][j]);
							continue;
						}
						else
						{
							data[i].chunks.push((all[i].slice(chunks[i][j], chunks[i][j] + 1).toString()));
						}
					}
				}

				// Clean chunks of leading/repeating/trailing dashes and find length of longest string.
				for(var x = 0; x < data[i].chunks.length; x ++)
				{
					data[i].chunks[x] = data[i].chunks[x].replace(/^-*|-{2,}|-*$/g, '');

					var strlen = data[i].chunks[x].replace(/-/g, '').length;

					if(strlen > data[i].maxchar) data[i].maxchar = strlen;
				}
			}

			else
			{
				console.log('Error: Can not select by: ' + i);
				return;
			}
		}

		return data;
	}
};

module.exports = D;