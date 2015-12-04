/* jslint node: true */
'use strict';

//
//	Config
//

var cnf =
{
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
			"color": "dim",
			"value": 1.2,
		}
	},

	"oeis":
	{
		"file": "./data/oeis",

		"include":
		{
			"seqlength":	">= 6",
			"numlength":	"<= 6",
			"numkeyspace":	"[0-9]",
			"numbinary": 	false,
			"hardlimit":	10000
		}
	}
};

module.exports = cnf;