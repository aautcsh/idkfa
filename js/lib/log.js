/* jslint node: true */
'use strict';

//
//	Log
//

var cnf		= require('../config');
var chalk	= require('chalk');

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
				str += chalk.bold('Chunk: ') + chalk.bold(j) + '\n\n';
				str += data[i][j].futhark.substring(0, 111) + '\n';
				str += '----------------------------------------------------------------------------------------------------------------' + '\n\n';

				// Display chunk data.
				for (var k = 0; k < data[i][j].length; k ++)
				{
					str += chalk.bold('Key: ' + k) + '\n\n';

					// Prepare IoC
					var ultrfioc = (data[i][j][k].ultrf.ioc).toString().substring(0, 10);
					var dltrfioc = (data[i][j][k].dltrf.ioc).toString().substring(0, 10);
					var ultrrioc = (data[i][j][k].ultrr.ioc).toString().substring(0, 10);
					var dltrrioc = (data[i][j][k].dltrr.ioc).toString().substring(0, 10);

					// Color Ioc
					ultrfioc = (data[i][j][k].ultrf.ioc >= cnf.ioc.low.value && data[i][j][k].ultrf.ioc < cnf.ioc.medium.value) ? chalk.green(ultrfioc) : ultrfioc;
					dltrfioc = (data[i][j][k].dltrf.ioc >= cnf.ioc.low.value && data[i][j][k].dltrf.ioc < cnf.ioc.medium.value) ? chalk.green(dltrfioc) : dltrfioc;
					ultrrioc = (data[i][j][k].ultrr.ioc >= cnf.ioc.low.value && data[i][j][k].ultrr.ioc < cnf.ioc.medium.value) ? chalk.green(ultrrioc) : ultrrioc;
					dltrrioc = (data[i][j][k].dltrr.ioc >= cnf.ioc.low.value && data[i][j][k].dltrr.ioc < cnf.ioc.medium.value) ? chalk.green(dltrrioc) : dltrrioc;

					ultrfioc = (data[i][j][k].ultrf.ioc >= cnf.ioc.medium.value && data[i][j][k].ultrf.ioc < cnf.ioc.high.value) ? chalk.yellow(ultrfioc) : ultrfioc;
					dltrfioc = (data[i][j][k].dltrf.ioc >= cnf.ioc.medium.value && data[i][j][k].dltrf.ioc < cnf.ioc.high.value) ? chalk.yellow(dltrfioc) : dltrfioc;
					ultrrioc = (data[i][j][k].ultrr.ioc >= cnf.ioc.medium.value && data[i][j][k].ultrr.ioc < cnf.ioc.high.value) ? chalk.yellow(ultrrioc) : ultrrioc;
					dltrrioc = (data[i][j][k].dltrr.ioc >= cnf.ioc.medium.value && data[i][j][k].dltrr.ioc < cnf.ioc.high.value) ? chalk.yellow(dltrrioc) : dltrrioc;

					ultrfioc = (data[i][j][k].ultrf.ioc >= cnf.ioc.high.value) ? chalk.red(ultrfioc) : ultrfioc;
					dltrfioc = (data[i][j][k].dltrf.ioc >= cnf.ioc.high.value) ? chalk.red(dltrfioc) : dltrfioc;
					ultrrioc = (data[i][j][k].ultrr.ioc >= cnf.ioc.high.value) ? chalk.red(ultrrioc) : ultrrioc;
					dltrrioc = (data[i][j][k].dltrr.ioc >= cnf.ioc.high.value) ? chalk.red(dltrrioc) : dltrrioc;

					// Glue together string
					str += 'ULF:\t' + ultrfioc + '\t' + data[i][j][k].ultrf.chars.toString().substring(0, 88) + '\n';
					str += 'DLF:\t' + dltrfioc + '\t' + data[i][j][k].dltrf.chars.toString().substring(0, 88) + '\n';
					str += 'ULR:\t' + ultrrioc + '\t' + data[i][j][k].ultrr.chars.toString().substring(0, 88) + '\n';
					str += 'DLR:\t' + dltrrioc + '\t' + data[i][j][k].dltrr.chars.toString().substring(0, 88) + '\n';
					str += '\n';

					// Glue matched words to the end
					str += 'ULF:\t';

					for(var ii = 0; ii < Object.keys(data[i][j][k].ultrf.frequency).length; ii ++)
					{
						str += chalk.blue(Object.keys(data[i][j][k].ultrf.frequency)[ii]) + ' ';
					}

					str += '\n' + 'DLF:\t';

					for(var jj = 0; jj < Object.keys(data[i][j][k].dltrf.frequency).length; jj ++)
					{
						str += chalk.blue(Object.keys(data[i][j][k].dltrf.frequency)[jj]) + ' ';
					}

					str += '\n' + 'ULR:\t';

					for(var kk = 0; kk < Object.keys(data[i][j][k].ultrr.frequency).length; kk ++)
					{
						str += chalk.blue(Object.keys(data[i][j][k].ultrr.frequency)[kk]) + ' ';
					}

					str += '\n' + 'DLR:\t';

					for(var ll = 0; ll < Object.keys(data[i][j][k].dltrr.frequency).length; ll ++)
					{
						str += chalk.blue(Object.keys(data[i][j][k].dltrr.frequency)[ll]) + ' ';
					}

					str += '\n\n';

				}

				str += '\n';
			}
		}


		console.log(str);

		// Need this to kill last worker.
		process.exit(0);
	}
};

module.exports = L;