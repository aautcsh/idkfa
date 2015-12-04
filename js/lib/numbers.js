/* jslint node: true */
'use strict';

//
//	Numbers
//

var F	= require('./functions.js');
var N	= require('number-theory');
var pi	= require('pi-number');
var _	= require('underscore');


var N =
{
	"pi": function(length)
	{
		var x = pi(length, true);
		return (x.slice(0, 1) + x.slice(2)).split('').map(Number);
	},

	"prime": function(length)
	{
		var primes = [];
		var j = 0;

		for (var i = 0; j < length; i ++)
		{
			if (N.isPrime(i))
			{
				primes.push(i);
				j ++;
			}
		}

		return primes;
	},

	"phi": function(length)
	{
		var phi = [];

		for (var i = 0; i < length; i ++)
		{
			phi.push(N.eulerPhi(i));
		}

		return phi;
	},

	"stream": function(char, length)
	{
		var stream = [];

		for (var i = 0; i < length; i ++)
		{
			stream.push(char);
		}

		return stream;
	},

	"ioc": function (data)
	{
		//console.log(data);

		var ioc = 0;

		var clone = data.slice(0);

		clone = F.array_remove(clone, '-');

		//console.log(data);

		var intCharsCount = clone.length;
		var arrCharsCount = F.array_count_values(clone);

		//console.log(intCharsCount);
		//console.log(arrCharsCount);

		if (intCharsCount > 0)
		{
			//console.log(intCharsCount);
			//console.log(F.sizeof_object(arrCharsCount));
			//console.log(arrCharsCount);

			for (var i in arrCharsCount)
			{
				//console.log(arrCharsCount[i]);

				arrCharsCount[i] = arrCharsCount[i] * (arrCharsCount[i] - 1);
			}

			//console.log(arrCharsCount);
			//console.log(F.array_sum(arrCharsCount));

			arrCharsCount = F.array_sum(arrCharsCount);

			ioc = (arrCharsCount / (intCharsCount * (intCharsCount - 1))) / 29;

			ioc = (ioc === 0) ? '0.0000000000000000000' : ioc;

			//console.log(ioc);
		}

		else
		{
			ioc = -1;
		}

		return ioc;

	}
};

module.exports = N;