/* jslint node: true */
'use strict';

//
//	Config
//

var C =
{
	"keys":
	[
		[0],
		'divinity'
	],

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
		"high":
		{
			"max": 3.0,
			"min": 1.5
		},

		"medium":
		{
			"max": 1.5,
			"min": 1.3
		},

		"low":
		{
			"max": 1.3,
			"min": 1.2
		}
	},

	"coi":
	{
		"high":
		{
			"bg": "red",
			"color": "white",
			"value": 1.5,
		},

		"medium":
		{
			"bg": "yellow",
			"color": "white",
			"value": 1.3,
		},

		"low":
		{
			"bg": "",
			"color": "",
			"value": 1.2,
		},

		"default":
		{
			"bg": "",
			"color": "dim"
		},
	},

	"oeis":
	{
		"file": "./data/oeis",

		"include":
		{
			"minchar":	1,
			"maxchar":	8,
			"keyspace":	"[0-9]",
			"binary": 	false,
			"limit":	10000
		}
	},

	"dict":
	{
		"file": "../../data/word",
		"minchar": 2,
		"maxchar": 6,
		"exclude": ['i', 'he', 'cat', 'dog'],
		"include": ['banana']
	}
};

module.exports = C;