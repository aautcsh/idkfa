/* jslint node: true */
'use strict';

//
//	Log
//

var C	= require('../config');
var K	= require('chalk');

var L =
{
	"toScreen": function(data)
	{
		//console.dir(data[0]);

		var str = '\n';

		// Loop Selectors
		for (var i = 0; i < data.length; i ++)
		{
			//str += 'Selector: ' + i + '\n\n';

			// Loop Chunks
			for (var j = 0; j < data[i].length; j ++)
			{
				str += K.bold.red('Chunk: ' + K.bold(j)) + '\n\n';
				str += data[i][j].futhark.substring(0, 111) + '\n';
				str += '----------------------------------------------------------------------------------------------------------------' + '\n\n';

				// Display chunk data.
				for (var k = 0; k < data[i][j].length; k ++)
				{
					str += K.bold('Key: ' + k) + '\n\n';

					// Prepare IoC
					var ulfioc = (data[i][j][k].ulf.ioc).toString().substring(0, 10);
					var dlfioc = (data[i][j][k].dlf.ioc).toString().substring(0, 10);
					var ulrioc = (data[i][j][k].ulr.ioc).toString().substring(0, 10);
					var dlrioc = (data[i][j][k].dlr.ioc).toString().substring(0, 10);

					// Color Ioc
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

					// Glue together string
					str += 'ULF:\t' + ulfioc + '\t' + data[i][j][k].ulf.chars.join('').replace(/[-]/g, '  ').substring(0, 88) + '\n';
					str += 'DLF:\t' + dlfioc + '\t' + data[i][j][k].dlf.chars.join('').replace(/[-]/g, '  ').substring(0, 88) + '\n';
					str += 'ULR:\t' + ulrioc + '\t' + data[i][j][k].ulr.chars.join('').replace(/[-]/g, '  ').substring(0, 88) + '\n';
					str += 'DLR:\t' + dlrioc + '\t' + data[i][j][k].dlr.chars.join('').replace(/[-]/g, '  ').substring(0, 88) + '\n';
					str += '\n';

					// Glue matched words to the end
					str += 'ULF:\t';

					for(var ii = 0; ii < Object.keys(data[i][j][k].ulf.frequency).length; ii ++)
					{
						str += K.blue(Object.keys(data[i][j][k].ulf.frequency)[ii]) + ' ';
					}

					str += '\n' + 'DLF:\t';

					for(var jj = 0; jj < Object.keys(data[i][j][k].dlf.frequency).length; jj ++)
					{
						str += K.blue(Object.keys(data[i][j][k].dlf.frequency)[jj]) + ' ';
					}

					str += '\n' + 'ULR:\t';

					for(var kk = 0; kk < Object.keys(data[i][j][k].ulr.frequency).length; kk ++)
					{
						str += K.blue(Object.keys(data[i][j][k].ulr.frequency)[kk]) + ' ';
					}

					str += '\n' + 'DLR:\t';

					for(var ll = 0; ll < Object.keys(data[i][j][k].dlr.frequency).length; ll ++)
					{
						str += K.blue(Object.keys(data[i][j][k].dlr.frequency)[ll]) + ' ';
					}

					str += '\n\n';

				}

				str += '\n';
			}
		}

		console.log(str);
		//process.exit(0); // Need this to kill last worker.
	}
};

module.exports = L;