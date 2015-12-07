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
				str += K.bold('Chunk: ') + K.bold(j) + '\n\n';
				str += data[i][j].futhark.substring(0, 111) + '\n';
				str += '----------------------------------------------------------------------------------------------------------------' + '\n\n';

				// Display chunk data.
				for (var k = 0; k < data[i][j].length; k ++)
				{
					str += K.bold('Key: ' + k) + '\n\n';

					// Prepare IoC
					var ultrfioc = (data[i][j][k].ultrf.ioc).toString().substring(0, 10);
					var dltrfioc = (data[i][j][k].dltrf.ioc).toString().substring(0, 10);
					var ultrrioc = (data[i][j][k].ultrr.ioc).toString().substring(0, 10);
					var dltrrioc = (data[i][j][k].dltrr.ioc).toString().substring(0, 10);

					// Color Ioc
					ultrfioc = (data[i][j][k].ultrf.ioc >= C.ioc.low.value && data[i][j][k].ultrf.ioc < C.ioc.medium.value) ? K.green(ultrfioc) : ultrfioc;
					dltrfioc = (data[i][j][k].dltrf.ioc >= C.ioc.low.value && data[i][j][k].dltrf.ioc < C.ioc.medium.value) ? K.green(dltrfioc) : dltrfioc;
					ultrrioc = (data[i][j][k].ultrr.ioc >= C.ioc.low.value && data[i][j][k].ultrr.ioc < C.ioc.medium.value) ? K.green(ultrrioc) : ultrrioc;
					dltrrioc = (data[i][j][k].dltrr.ioc >= C.ioc.low.value && data[i][j][k].dltrr.ioc < C.ioc.medium.value) ? K.green(dltrrioc) : dltrrioc;

					ultrfioc = (data[i][j][k].ultrf.ioc >= C.ioc.medium.value && data[i][j][k].ultrf.ioc < C.ioc.high.value) ? K.yellow(ultrfioc) : ultrfioc;
					dltrfioc = (data[i][j][k].dltrf.ioc >= C.ioc.medium.value && data[i][j][k].dltrf.ioc < C.ioc.high.value) ? K.yellow(dltrfioc) : dltrfioc;
					ultrrioc = (data[i][j][k].ultrr.ioc >= C.ioc.medium.value && data[i][j][k].ultrr.ioc < C.ioc.high.value) ? K.yellow(ultrrioc) : ultrrioc;
					dltrrioc = (data[i][j][k].dltrr.ioc >= C.ioc.medium.value && data[i][j][k].dltrr.ioc < C.ioc.high.value) ? K.yellow(dltrrioc) : dltrrioc;

					ultrfioc = (data[i][j][k].ultrf.ioc >= C.ioc.high.value) ? K.red(ultrfioc) : ultrfioc;
					dltrfioc = (data[i][j][k].dltrf.ioc >= C.ioc.high.value) ? K.red(dltrfioc) : dltrfioc;
					ultrrioc = (data[i][j][k].ultrr.ioc >= C.ioc.high.value) ? K.red(ultrrioc) : ultrrioc;
					dltrrioc = (data[i][j][k].dltrr.ioc >= C.ioc.high.value) ? K.red(dltrrioc) : dltrrioc;

					// Glue together string
					str += 'ULF:\t' + ultrfioc + '\t' + data[i][j][k].ultrf.chars.join('').replace(/[-]/g, '  ').substring(0, 88) + '\n';
					str += 'DLF:\t' + dltrfioc + '\t' + data[i][j][k].dltrf.chars.join('').replace(/[-]/g, '  ').substring(0, 88) + '\n';
					str += 'ULR:\t' + ultrrioc + '\t' + data[i][j][k].ultrr.chars.join('').replace(/[-]/g, '  ').substring(0, 88) + '\n';
					str += 'DLR:\t' + dltrrioc + '\t' + data[i][j][k].dltrr.chars.join('').replace(/[-]/g, '  ').substring(0, 88) + '\n';
					str += '\n';

					// Glue matched words to the end
					str += 'ULF:\t';

					for(var ii = 0; ii < Object.keys(data[i][j][k].ultrf.frequency).length; ii ++)
					{
						str += K.blue(Object.keys(data[i][j][k].ultrf.frequency)[ii]) + ' ';
					}

					str += '\n' + 'DLF:\t';

					for(var jj = 0; jj < Object.keys(data[i][j][k].dltrf.frequency).length; jj ++)
					{
						str += K.blue(Object.keys(data[i][j][k].dltrf.frequency)[jj]) + ' ';
					}

					str += '\n' + 'ULR:\t';

					for(var kk = 0; kk < Object.keys(data[i][j][k].ultrr.frequency).length; kk ++)
					{
						str += K.blue(Object.keys(data[i][j][k].ultrr.frequency)[kk]) + ' ';
					}

					str += '\n' + 'DLR:\t';

					for(var ll = 0; ll < Object.keys(data[i][j][k].dltrr.frequency).length; ll ++)
					{
						str += K.blue(Object.keys(data[i][j][k].dltrr.frequency)[ll]) + ' ';
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