/* jslint node: true */
'use strict';

//
//	Config
//

var C =
{
	"keys": [], // [0], 'divinity', [3], 'firfumference'

	"raw": "./data/liber",

	"encoding": "utf8",

	"delimiter":
	{
		"word":			"-",
		"clause":		".",
		"paragraph":	"&",
		"segment":		"$",
		"line":			"/",
		"page":			"%"
	},

	"ioc":
	{
		"high": {"value": 1.5},
		"medium": {"value": 1.3},
		"low": {"value": 1.2,},
	},

	"oeis":
	{
		"file": "./data/oeis",

		"minchar":	1,
		"maxchar":	8,
		"binary": 	false,
		"limit":	10000
	},

	"dict":
	{
		"file": "./data/word",

		"minchar": 2,
		"maxchar": 6,
		"include": ['banana', 'ninja', 'WIS/ZDOM', 'C/KOAN', 'MAS/ZTER', 'PRIMES/Z'],
		"exclude": ['i', 'he', 'cat', 'dog']
	}
};

module.exports = C;