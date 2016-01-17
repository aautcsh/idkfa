/* jslint node: true */
'use strict';

//
//	Log
//

var C	= require('../config');
var K	= require('chalk');
var _	= require('underscore');

var L =
{
	"toScreen": function(data)
	{
		var str = '\n';

		// Loop Selectors
		for (var i = 0; i < data.length; i ++)
		{
			// Loop Chunks
			for (var j = 0; j < data[i].length; j ++)
			{
				var frequencies = data[i][j].frequencies;

				var sorted = [];
				for (var foo in frequencies) sorted.push([foo, frequencies[foo]]);
				sorted.sort(function(a, b) {return a[1] - b[1];}).reverse();

				var foofreq = '';
				for (var z = 0, zz = sorted.length; z < zz; z ++)
				{
					foofreq += sorted[z][0] + ':' + sorted[z][1] + '  ';
				}

				foofreq = foofreq.substring(0, 95) + '\n' + foofreq.substring(95);

				str += K.bold.red('Chunk: ' + j) + '\n\n';
				str += 'Words: ' + data[i][j].wordcount + ' // Chars: ' + data[i][j].charcount + ' // CRC: ' + data[i][j].crc + '\n\n';
				//str += 'Frequencies: ' + foofreq + '\n\n';
				//str += 'Doubles: ' + '' + '\n\n';
				str += data[i][j].futhark.substring(0, 120) + '\n';
				str += '---------------------------------------------------------------------------------------------------------------------------' + '\n\n';

				// Display chunk data.
				for (var k = 0; k < data[i][j].length; k ++)
				{
					str += K.bold('Key:\t') + data[i][j][k].key.substring(0, 115) + '\n\n';

					// Prepare IoC
					var ulfioc = (data[i][j][k].ulf.ioc).toString().substring(0, 10);
					var dlfioc = (data[i][j][k].dlf.ioc).toString().substring(0, 10);
					var ulrioc = (data[i][j][k].ulr.ioc).toString().substring(0, 10);
					var dlrioc = (data[i][j][k].dlr.ioc).toString().substring(0, 10);

					// Color IoC
					ulfioc = (data[i][j][k].ulf.ioc >= C.ioc.low.value && data[i][j][k].ulf.ioc < C.ioc.medium.value) ? K.green(ulfioc) : ulfioc;
					dlfioc = (data[i][j][k].dlf.ioc >= C.ioc.low.value && data[i][j][k].dlf.ioc < C.ioc.medium.value) ? K.green(dlfioc) : dlfioc;
					ulrioc = (data[i][j][k].ulr.ioc >= C.ioc.low.value && data[i][j][k].ulr.ioc < C.ioc.medium.value) ? K.green(ulrioc) : ulrioc;
					dlrioc = (data[i][j][k].dlr.ioc >= C.ioc.low.value && data[i][j][k].dlr.ioc < C.ioc.medium.value) ? K.green(dlrioc) : dlrioc;

					ulfioc = (data[i][j][k].ulf.ioc >= C.ioc.medium.value && data[i][j][k].ulf.ioc < C.ioc.high.value) ? K.yellow(ulfioc) : ulfioc;
					dlfioc = (data[i][j][k].dlf.ioc >= C.ioc.medium.value && data[i][j][k].dlf.ioc < C.ioc.high.value) ? K.yellow(dlfioc) : dlfioc;
					ulrioc = (data[i][j][k].ulr.ioc >= C.ioc.medium.value && data[i][j][k].ulr.ioc < C.ioc.high.value) ? K.yellow(ulrioc) : ulrioc;
					dlrioc = (data[i][j][k].dlr.ioc >= C.ioc.medium.value && data[i][j][k].dlr.ioc < C.ioc.high.value) ? K.yellow(dlrioc) : dlrioc;

					ulfioc = (data[i][j][k].ulf.ioc >= C.ioc.high.value) ? K.red(ulfioc) : ulfioc;
					dlfioc = (data[i][j][k].dlf.ioc >= C.ioc.high.value) ? K.red(dlfioc) : dlfioc;
					ulrioc = (data[i][j][k].ulr.ioc >= C.ioc.high.value) ? K.red(ulrioc) : ulrioc;
					dlrioc = (data[i][j][k].dlr.ioc >= C.ioc.high.value) ? K.red(dlrioc) : dlrioc;

					// Prepare Text
					var ulftxt = data[i][j][k].ulf.chars.join('').replace(/[-]/g, '  ').substring(0, 99);
					var dlftxt = data[i][j][k].dlf.chars.join('').replace(/[-]/g, '  ').substring(0, 99);
					var ulrtxt = data[i][j][k].ulr.chars.join('').replace(/[-]/g, '  ').substring(0, 99);
					var dlrtxt = data[i][j][k].dlr.chars.join('').replace(/[-]/g, '  ').substring(0, 99);

					// Color Text
					ulftxt = (data[i][j][k].ulf.ioc >= C.ioc.low.value && data[i][j][k].ulf.ioc < C.ioc.medium.value) ? K.green(ulftxt) : ulftxt;
					dlftxt = (data[i][j][k].dlf.ioc >= C.ioc.low.value && data[i][j][k].dlf.ioc < C.ioc.medium.value) ? K.green(dlftxt) : dlftxt;
					ulrtxt = (data[i][j][k].ulr.ioc >= C.ioc.low.value && data[i][j][k].ulr.ioc < C.ioc.medium.value) ? K.green(ulrtxt) : ulrtxt;
					dlrtxt = (data[i][j][k].dlr.ioc >= C.ioc.low.value && data[i][j][k].dlr.ioc < C.ioc.medium.value) ? K.green(dlrtxt) : dlrtxt;

					ulftxt = (data[i][j][k].ulf.ioc >= C.ioc.medium.value && data[i][j][k].ulf.ioc < C.ioc.high.value) ? K.yellow(ulftxt) : ulftxt;
					dlftxt = (data[i][j][k].dlf.ioc >= C.ioc.medium.value && data[i][j][k].dlf.ioc < C.ioc.high.value) ? K.yellow(dlftxt) : dlftxt;
					ulrtxt = (data[i][j][k].ulr.ioc >= C.ioc.medium.value && data[i][j][k].ulr.ioc < C.ioc.high.value) ? K.yellow(ulrtxt) : ulrtxt;
					dlrtxt = (data[i][j][k].dlr.ioc >= C.ioc.medium.value && data[i][j][k].dlr.ioc < C.ioc.high.value) ? K.yellow(dlrtxt) : dlrtxt;

					ulftxt = (data[i][j][k].ulf.ioc >= C.ioc.high.value) ? K.red(ulftxt) : ulftxt;
					dlftxt = (data[i][j][k].dlf.ioc >= C.ioc.high.value) ? K.red(dlftxt) : dlftxt;
					ulrtxt = (data[i][j][k].ulr.ioc >= C.ioc.high.value) ? K.red(ulrtxt) : ulrtxt;
					dlrtxt = (data[i][j][k].dlr.ioc >= C.ioc.high.value) ? K.red(dlrtxt) : dlrtxt;

					// Glue together string
					str += 'ULF:\t' + ulfioc + '\t' + ulftxt + '\n';
					str += 'DLF:\t' + dlfioc + '\t' + dlftxt + '\n';
					str += 'ULR:\t' + ulrioc + '\t' + ulrtxt + '\n';
					str += 'DLR:\t' + dlrioc + '\t' + dlrtxt + '\n';
					str += '\n';

					// Glue matched words to the end
					str += 'ULF:\t';

					var tmp1 = '';
					for(var ii = 0; ii < Object.keys(data[i][j][k].ulf.frequency).length; ii ++)
					{
						tmp1 += Object.keys(data[i][j][k].ulf.frequency)[ii] + ' ';
					}

					str += K.blue(tmp1.substring(0, 110));

					str += '\n' + 'DLF:\t';

					var tmp2 = '';
					for(var jj = 0; jj < Object.keys(data[i][j][k].dlf.frequency).length; jj ++)
					{
						tmp2 += Object.keys(data[i][j][k].dlf.frequency)[jj] + ' ';
					}

					str += K.blue(tmp2.substring(0, 110));

					str += '\n' + 'ULR:\t';

					var tmp3 = '';
					for(var kk = 0; kk < Object.keys(data[i][j][k].ulr.frequency).length; kk ++)
					{
						tmp3 += Object.keys(data[i][j][k].ulr.frequency)[kk] + ' ';
					}

					str += K.blue(tmp3.substring(0, 110));

					str += '\n' + 'DLR:\t';

					var tmp4 = '';
					for(var ll = 0; ll < Object.keys(data[i][j][k].dlr.frequency).length; ll ++)
					{
						tmp4 += Object.keys(data[i][j][k].dlr.frequency)[ll] + ' ';
					}

					str += K.blue(tmp4.substring(0, 110));

					str += '\n\n';

				}

				str += '\n';
			}
		}

		console.log(str);
	}
};

module.exports = L;