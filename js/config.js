/* jslint node: true */
'use strict';

//
//	Config
//

var C =
{
	"keys":
	[



	], // [0], 'divinity', [3], 'firfumferenfe'

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


/*
	'INSTAR', 'WIDSOM', 'CICADA', 'JOURNEY', 'BELIEVE', 'STUDENT', 'FAREWELL', 'KWESTION', 'DISCOVER',
	'DIVINITY', 'STRUGGLE', 'SUFFERING', 'KNOWLEDGE', 'ENCRYPTED', 'ADHERENCE', 'PILGRIMAGE', 'EXPERIENCE',
	'CONSUMPTION', 'ENLIGHTENED', 'UNREASONABLE', 'INTELLIGENCE', 'PRESERVATION', 'CONSCIOUSNESS',
	'INTERCONNECTEDNESS'
*/