/* jslint node: true */
'use strict';

//
//	Log
//

var cnf		= require('../config');
var chalk	= require('chalk');

var log =
{
	"toScreen": function(data)
	{
		//console.dir(data[0]);

		var str = '';

		// Loop Selectors
		for (var i = 0; i < data.length; i ++)
		{
			str += 'Selector: ' + i + '\n\n';

			// Loop Chunks
			for (var j = 0; j < data[i].length; j ++)
			{
				str += chalk.bold('Chunk: ') + chalk.bold(j) + '\n\n';
				str += data[i][j].futhark.substring(0, 111) + '\n';
				str += '----------------------------------------------------------------------------------------------------------------' + '\n\n';

				for (var k = 0; k < data[i][j].length; k ++)
				{
					str += 'Key: ' + k + '\n\n';

					var dltrfioc = (data[i][j][k].dltrf.ioc * 1000).toString().substring(0,10);
					var dltrrioc = (data[i][j][k].dltrr.ioc * 1000).toString().substring(0,10);
					var ultrfioc = (data[i][j][k].ultrf.ioc * 1000).toString().substring(0,10);
					var ultrrioc = (data[i][j][k].ultrr.ioc * 1000).toString().substring(0,10);

					dltrfioc = (dltrfioc > cnf.ioc.high.min) ? chalk.bgGreen(dltrfioc) : dltrfioc;
					dltrrioc = (dltrrioc > cnf.ioc.high.min) ? chalk.bgGreen(dltrrioc) : dltrrioc;
					ultrfioc = (ultrfioc > cnf.ioc.high.min) ? chalk.bgGreen(ultrfioc) : ultrfioc;
					ultrrioc = (ultrrioc > cnf.ioc.high.min) ? chalk.bgGreen(ultrrioc) : ultrrioc;

					dltrfioc = (dltrfioc > cnf.ioc.medium.min && dltrfioc < cnf.ioc.medium.max) ? chalk.green(dltrfioc) : dltrfioc;
					dltrrioc = (dltrrioc > cnf.ioc.medium.min && dltrrioc < cnf.ioc.medium.max) ? chalk.green(dltrrioc) : dltrrioc;
					ultrfioc = (ultrfioc > cnf.ioc.medium.min && ultrfioc < cnf.ioc.medium.max) ? chalk.green(ultrfioc) : ultrfioc;
					ultrrioc = (ultrrioc > cnf.ioc.medium.min && ultrrioc < cnf.ioc.medium.max) ? chalk.green(ultrrioc) : ultrrioc;

					dltrfioc = (dltrfioc < cnf.ioc.low.max) ? chalk.dim(dltrfioc) : dltrfioc;
					dltrrioc = (dltrrioc < cnf.ioc.low.max) ? chalk.dim(dltrrioc) : dltrrioc;
					ultrfioc = (ultrfioc < cnf.ioc.low.max) ? chalk.dim(ultrfioc) : ultrfioc;
					ultrrioc = (ultrrioc < cnf.ioc.low.max) ? chalk.dim(ultrrioc) : ultrrioc;

					str += 'DLF:\t' + dltrfioc + '\t' + data[i][j][k].dltrf.chars.toString().substring(0, 88) + '\n';
					str += 'DLR:\t' + dltrrioc + '\t' + data[i][j][k].dltrr.chars.toString().substring(0, 88) + '\n';
					str += 'ULF:\t' + ultrfioc + '\t' + data[i][j][k].ultrf.chars.toString().substring(0, 88) + '\n';
					str += 'ULR:\t' + ultrrioc + '\t' + data[i][j][k].ultrr.chars.toString().substring(0, 88) + '\n';
					str += '\n';

				}

				str += '\n';
			}
		}

		console.log(str);

	}
};

module.exports = log;


/*
	Paragraph: 1

	ᚱ-ᛝᚱᚪᛗᚹ.ᛄᛁᚻᛖᛁᛡᛁ-ᛗᚫᚣᚹ-ᛠᚪᚫᚾ-ᚣᛖᛈ-ᛄᚫᚫᛞ.ᛁᛉᛞᛁᛋᛇ-ᛝᛚᚱᛇ
	---------------------------------------------------------------

	Key: (prime(x) -1)²

	DLTRF: 		0.9913726452		FJHING UZAHWG UIJHSZWM QJWHERRH
	DLTRR: 		1.0001249827		FJHING UZAHWG UIJHSZWM QJWHERRH
	ULTRF: 		1.0092987223		FJHING UZAHWG UIJHSZWM QJWHERRH
	ULTRR: 		0.9822782292		FJHING UZAHWG UIJHSZWM QJWHERRH
	DRTLF: 		0.9913726452		FJHING UZAHWG UIJHSZWM QJWHERRH
	DRTLR: 		1.0092987223		FJHING UZAHWG UIJHSZWM QJWHERRH
	URTLF: 		0.9913726452		FJHING UZAHWG UIJHSZWM QJWHERRH
	URTLR: 		1.0092987223		FJHING UZAHWG UIJHSZWM QJWHERRH

	Key: (phi(x))⁻²

	DLTRF: 		0.9913726452		FJHING UZAHWG UIJHSZWM QJWHERRH
	DLTRR: 		1.0001249827		FJHING UZAHWG UIJHSZWM QJWHERRH
	ULTRF: 		1.0092987223		FJHING UZAHWG UIJHSZWM QJWHERRH
	ULTRR: 		0.9822782292		FJHING UZAHWG UIJHSZWM QJWHERRH
	DRTLF: 		0.9913726452		FJHING UZAHWG UIJHSZWM QJWHERRH
	DRTLR: 		1.0092987223		FJHING UZAHWG UIJHSZWM QJWHERRH
	URTLF: 		0.9913726452		FJHING UZAHWG UIJHSZWM QJWHERRH
	URTLR: 		1.0092987223		FJHING UZAHWG UIJHSZWM QJWHERRH


	Paragraph: 2

	ᛄᚫᚫᛞ.ᛁᛉᛞᛁᛋᛇ-ᛝᛚᚱᛇ-ᚱ-ᛝᚱᚪᛗᚹ.ᛄᛁᚻᛖᛁᛡᛁ-ᛗᚫᚣᚹ-ᛠᚪᚫᚾ-ᚣᛖᛈ
	---------------------------------------------------------------

	Key: (prime(x) -1)²

	DLTRF: 		0.9913726452		FJHING UZAHWG UIJHSZWM QJWHERRH
	DLTRR: 		1.0001249827		FJHING UZAHWG UIJHSZWM QJWHERRH
	ULTRF: 		1.0092987223		FJHING UZAHWG UIJHSZWM QJWHERRH
	ULTRR: 		0.9822782292		FJHING UZAHWG UIJHSZWM QJWHERRH
	DRTLF: 		0.9913726452		FJHING UZAHWG UIJHSZWM QJWHERRH
	DRTLR: 		1.0092987223		FJHING UZAHWG UIJHSZWM QJWHERRH
	URTLF: 		0.9913726452		FJHING UZAHWG UIJHSZWM QJWHERRH
	URTLR: 		1.0092987223		FJHING UZAHWG UIJHSZWM QJWHERRH

	Key: (phi(x))⁻²

	DLTRF: 		0.9913726452		FJHING UZAHWG UIJHSZWM QJWHERRH
	DLTRR: 		1.0001249827		FJHING UZAHWG UIJHSZWM QJWHERRH
	ULTRF: 		1.0092987223		FJHING UZAHWG UIJHSZWM QJWHERRH
	ULTRR: 		0.9822782292		FJHING UZAHWG UIJHSZWM QJWHERRH
	DRTLF: 		0.9913726452		FJHING UZAHWG UIJHSZWM QJWHERRH
	DRTLR: 		1.0092987223		FJHING UZAHWG UIJHSZWM QJWHERRH
	URTLF: 		0.9913726452		FJHING UZAHWG UIJHSZWM QJWHERRH
	URTLR: 		1.0092987223		FJHING UZAHWG UIJHSZWM QJWHERRH

*/