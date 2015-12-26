/* jslint node: true */
'use strict';

//
//	Config
//

var C =
{
	"keys": [], // [0], 'divinity', [3], 'firfumferenfe'

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

	"passthrough": {'-': true, 'F': true, '0': true, '1': true, '2': true, '3': true, '4': true, '5': true, '6': true, '7': true, '8': true, '9': true},

	"ioc":
	{
		"high": {"value": 1.5},
		"medium": {"value": 1.3},
		"low": {"value": 1.1}
	},

	"oeis":
	{
		"file": "./data/oeis",

		"minvalue":		-99999999,
		"maxvalue":		99999999,
		"minlength":	5,
		"limit":		10000
	},

	"dict":
	{
		"file": "./data/word",

		"minchar": 2,
		"maxchar": 6,
		"include": ['banana', 'ninja', 'WISDOM', 'KOAN', 'MASTER', 'PRIMES', 'INSTAR'],
		"exclude": ['i', 'he', 'cat', 'dog']
	}
};

module.exports = C;