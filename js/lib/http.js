/* jslint node: true */
'use strict';

//
//	Http
//

var request		= require('request');
var fs			= require('fs');

var logfile		= '../../log/oeis-4.txt';

var url			= 'http://oeis.org/';
var prefix		= 'A';
var postfix		= '/list';

var encoding = 'utf8';

var strlen = 6;


var start = 0;
var stop = 0;

//var start	= 264686;
//var stop	= 264684;

//start	= 264686;
//stop	= 264000;

start	= 2000;
stop	= 0;

var requests = [];

var pad = function (num, size)
{
	var s = num + '';
	while (s.length < size) s = '0' + s;
	return s;
};

var get = function (url)
{
	request(url, function (error, response, body)
	{
		if (!error && response.statusCode == 200)
		{
			var data = {};

			var regexTitle = /<title[^>]*>([^<]+)<\/title>/;
			var regexSeq = /\[(.|\n)*?\]/gm;

			var title = body.match(regexTitle)[1].substr(0,7);
			var seq = body.match(regexSeq);

			seq = seq[0].replace(/[\[\]\s]/g, '').split(',').map(Number);

			data[title] = seq;

			store(data);
		}
	});
};

var store = function (data)
{
	data = JSON.stringify(data);
	fs.appendFileSync(logfile, data + '\n', encoding);
};

while (start -- && start >= stop) requests.push(url + prefix + pad(start + 1, strlen) + postfix);

//console.log(requests);

//sfor(var i in requests) get(requests[i]);