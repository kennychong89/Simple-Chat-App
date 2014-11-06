var io = require('socket.io');
var Room = require('./javascript/room.js');

// should this be an object instead?
var roomList = ['room1', 'room2', 'room3'];
var currentRoom = {};
var nickNames = {};
//var namesUsed = [];
var guestCounter = 0;

exports.listen = function(server) {
	var chatIO = io.listen(server);
	loadDummyRooms();
	chatIO.set('log level', 1);

	chatIO.on('connection', function(socket) {
		// magic here.
		
		// assign user a name
		guestCounter = assignName(socket, guestCounter, nickNames); 

		// a quick test
		socket.emit('Hi', {hello: 'world'});

		socket.on('room number', function(data) {
			// display a simple message
			console.log('Hello World!, Room #: ' + data.roomNumber);
		});

		socket.on('join room', function(data) {
			// ignore the data for now
			// test case: all users will join the same room for now
			joinRoom(socket, 1);
		});

		socket.on('chat message', function(data) {
			var usrMsg = data.message;

			console.log(socket);

			sendChatMessage(socket, usrMsg);
		});

		socket.on('disconnect', function() {
			leaveRoom(socket);
		});


		socket.on('editor text', function(data) {
			var text = data.text;

			sendEditorText(socket, text);
		});
		//console.log(roomList.length);

		//socket.emit('get rooms',  {'roomsList' : roomList});
	});
};

function assignName(socket, guestNumber, nickNames) {
	var name = 'Guest ' + guestNumber;
	
	nickNames[socket.id] = name;

	socket.emit('nameResult', { name : name });

	return guestNumber + 1;
}

function joinRoom(socket, roomNumber) {
	socket.join(roomNumber);

	currentRoom[socket.id] = roomNumber;

	// send user message that he has joined room
	socket.emit('message', {message: 'You have connected to room #: ' + roomNumber});	

	// broadcast to the rest of the room
	socket.broadcast.to(roomNumber).emit('message', {message: 'User ' + nickNames[socket.id] + " has joined the room"});
}

function leaveRoom(socket) {
	// remove the user from chat
	delete nickNames[socket.id];
}

function sendChatMessage(socket, message) {
	//console.log('current room: ' + currentRoomName);
	//console.log('socket id: ' + socket.id);
	var currentRoomName = currentRoom[socket.id];
	var userName = nickNames[socket.id];

	socket.broadcast.to(currentRoomName).emit('message', {message: userName + ": " + message});
}

function createRoom(id, roomName, owner) {
	var room = new Room(id, roomName, owner);
	//console.log(room);

	roomList.push(room);
}

function sendEditorText(socket, message) {
	var currentRoomName = currentRoom[socket.id];
	//var userName = nickNames[socket.id];

	socket.broadcast.to(currentRoomName).emit('editor result', {edittext: message});
}

function loadDummyRooms() {
	var dummyIDs = [23, 11, 14, 12, 18];
	var dummyNames = ['JavaScript Express.js help!', 'Pascal 360', 'Android Intergration', 'C# Errors', 'Python Tools'];
	var dummyOwners = ['John', 'David', 'Kerry', 'Hussein', 'Jason'];

	for (var i = 0; i < 2; i++) {
		createRoom(dummyIDs[i], dummyNames[i], dummyOwners[i]);
	}
}

exports.validate = function() {

};