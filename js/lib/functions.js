/* jslint node: true */
'use strict';

//
//	Functions
//

Array.prototype.noempty = function()
{
	var arr = [];

	for (var i = 0; i < this.length; i ++)
	{
		if (this[i])
		{
			arr.push(this[i]);
		}
	}

	return arr;
};

Array.prototype.unique = function(value, index, self)
{
	return self.indexOf(value) === index;
};

var F =
{
	"array_count_values": function (array)
	{
		var tmp_arr = {},
		key = '',
		t = '';

		var __getType = function(obj)
		{
			// Objects are php associative arrays.
			var t = typeof obj;
			t = t.toLowerCase();
			if (t === 'object')
			{
				t = 'array';
			}
			return t;
		};

		var __countValue = function(value)
		{
			switch (typeof value)
			{
				case 'number':
				if (Math.floor(value) !== value)
				{
					return;
				}

				// Fall-through
				case 'string':
				if (value in this && this.hasOwnProperty(value))
				{
					++ this[value];
				}
				else
				{
					this[value] = 1;
				}
			}
		};

		t = __getType(array);
		if (t === 'array')
		{
			for (key in array)
			{
				if (array.hasOwnProperty(key))
				{
					__countValue.call(tmp_arr, array[key]);
				}
			}
		}

		return tmp_arr;
	},

	"array_sum": function (array)
	{
		var key, sum = 0;

		if (array && typeof array === 'object' && array.change_key_case)
		{
			// Duck-type check for our own array()-created PHPJS_Array
			return array.sum.apply(array, Array.prototype.slice.call(arguments, 0));
		}

		// input sanitation
		if (typeof array !== 'object')
		{
			return null;
		}

		for (key in array)
		{
			if (!isNaN(parseFloat(array[key])))
			{
				sum += parseFloat(array[key]);
			}
		}

		return sum;
	},

	"array_remove": function (array, what)
	{
		var i = array.length;

		var hhh = (i) ? 'titte' : null;

		var xxx = (true || false);

		while (i --)  if (array[i] === what ) array.splice(i, 1);

		return array;
	},

	// Object.keys(myArray).length
	"sizeof_object": function (obj)
	{
		var size = 0, key;
		for (key in obj)
		{
			if (obj.hasOwnProperty(key)) size ++;
		}

		return size;
	}
};

module.exports = F;