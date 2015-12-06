/* jslint node: true */
'use strict';

//
//	Numbers
//

var nt	= require('number-theory');
var pi	= require('pi-number');
var _	= require('underscore');

var N =
{
	"pi": function(length, decimal)
	{
		var p = [];
		// Returns: 1, 4, 1, 5, 9, 2, 6, 5, 3, 5..
		if (decimal) p = pi(length + 1, false).split('').map(Number);
		// Returns: 3, 1, 4, 1, 5, 9, 2, 6, 5, 3..
		else {p = pi(length, true); p = (p.slice(0, 1) + p.slice(2)).split('').map(Number);}
		return p;
	},

	"prime": function(length)
	{
		var p = [];
		for (var i = 0, j = 0; j < length; i ++) if (nt.isPrime(i)) {p.push(i); j ++;}
		return p;
	},

	"phi": function(length)
	{
		var p = [];
		for (var i = 0; i < length; i ++) p.push(nt.eulerPhi(i));
		return p;
	},

	"stream": function(char, length)
	{
		var s = [];
		for (var i = 0; i < length; i ++) s.push(char);
		return s;
	},

	"ioc": function (data)
	{
		// Clone data so original gets passed on unchanged.
		var clone = data.slice(0);

		// Filter out word delimiter.
		clone = _.without(clone, '-');

		var allchars = clone.length;
		var frequency = {};
		var foo, char;

		// Count char frequency.
		for (var i = 0; i < allchars; i ++)
		{
			char = clone[i].toUpperCase();
			frequency[char] = frequency[char] ? frequency[char] + 1 : 1;
		}

		// Calculate denominator.
		_.each(frequency, function (a, b, c) {c[b] = c[b] * (c[b] - 1);});
		var baz = (_.values(frequency));
		var sum = 0;
		for (var k = 0; k < baz.length; k ++) sum += baz[k];

		// Calculate and return Ioc.
		return sum / (allchars * (allchars - 1) / 29);
	}
};

//console.log(N.pi(10, 1));
//console.log(N.prime(10));
//console.log(N.phi(10));
//var test = "LOREMIPSUMISSIMPLYDUMMYTEXTOFTHEPRINTINGANDTYPESETTINGINDUSTRYLOREMIPSUMHASBEENTHEINDUSTRYSSTANDARDDUMMYTEXTEVERSINCETHESWHENANUNKNOWNPRINTERTOOKAGALLEYOFTYPEANDSCRAMBLEDITTOMAKEATYPESPECIMENBOOKITHASSURVIVEDNOTONLYFIVECENTURIESBUTALSOTHELEAPINTOELECTRONICTYPESETTINGREMAININGESSENTIALLYUNCHANGEDITWASPOPULARISEDINTHESWITHTHERELEASEOFLETRASETSHEETSCONTAININGLOREMIPSUMPASSAGESANDMORERECENTLYWITHDESKTOPPUBLISHINGSOFTWARELIKEALDUSPAGEMAKERINCLUDINGVERSIONSOFLOREMIPSUMITISALONGESTABLISHEDFACTTHATAREADERWILLBEDISTRACTEDBYTHEREADABLECONTENTOFAPAGEWHENLOOKINGATITSLAYOUTTHEPOINTOFUSINGLOREMIPSUMISTHATITHASAMOREORLESSNORMALDISTRIBUTIONOFLETTERSASOPPOSEDTOUSINGCONTENTHERECONTENTHEREMAKINGITLOOKLIKEREADABLEENGLISHMANYDESKTOPPUBLISHINGPACKAGESANDWEBPAGEEDITORSNOWUSELOREMIPSUMASTHEIRDEFAULTMODELTEXTANDASEARCHFORLOREMIPSUMWILLUNCOVERMANYWEBSITESSTILLINTHEIRINFANCYVARIOUSVERSIONSHAVEEVOLVEDOVERTHEYEARSSOMETIMESBYACCIDENTSOMETIMESONPURPOSEINJECTEDHUMOURANDTHELIKE".split('');
//console.log(N.ioc(test));

module.exports = N;