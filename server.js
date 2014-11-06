var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var chatserver = require('./lib/chatserver.js');

var root = __dirname;

var server = http.createServer(function(req, res) {
	// do our magic here
	// a very simple router
	switch (req.method) {
			case 'GET':
			 	// gets index.html
				if (req.url == '/')
					serveFile(req, res, 'index.html');
				else if (req.url.match(/^\/room\/(\d+)$/)) {
					serveFile(req, res, 'room.html');
				} else 
					serveFile(req, res);
			break;
	}

	// GET '/room/12345'
		// this will retrieve the room (TODO)
});

server.listen(8000);
chatserver.listen(server);

// send our errors here
function sendError(res, errorCode, errorMsg) {
	res.statusCode = errorCode;
	res.end(errorMsg);
}

function serveFile(req, res, filename) {
		// this will retrieve index.html
		var url = parse(req.url);
		var path = '';
		
		if (filename != undefined)
			// search in public
			path = join(root, '/public/', filename);
		else
			path = join(root, '/public/', url.pathname);

		fs.stat(path, function(err, stat) {
			if (err) {
				if ('ENOENT' == err.code) {
					sendError(res, 404, 'File Not Found');
				} else {
					sendError(res, 500, 'Internal Server Error');
				}
			} else {
				res.setHeader('Content-Length', stat.size);

				var stream = fs.createReadStream(path);
				stream.pipe(res);

				stream.on('error', function(err) {
					sendError(res, 500, 'Internal Server Error');
				});
			}
		});
}	
