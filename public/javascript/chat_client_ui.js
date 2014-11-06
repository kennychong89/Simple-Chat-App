var socket = io.connect();

$(document).ready(function() {

	/*
	// how do we get the url?
	var currentURL = window.location;
	// assume that the room is in the third index
	var roomNumber = currentURL.pathname.split('/')[2]);
	*/
	var path = $(location).attr('pathname');
	
	// split the path to get room. lets assume the room is at index 2 for now.
	var roomNumber = path.split('/')[2];
	var username = '';

	socket.emit('room number', {'roomNumber' : roomNumber});

	socket.emit('join room', {'roomNumber': roomNumber});
	/*
	socket.on('Hi', function(data) {
		console.log(data.hello);
	});
	*/
	socket.on('get rooms', function(data) {
		data.roomsList.forEach(function(room) {
			var roomNum = room.__roomNumber;
			var roomName = room.__roomName;
			var roomOwnerName = room.__roomOwnerName;

			var newlistItem = $('<li></li>').text(
				'Room Number: ' + roomNumber + 
				', Room Name: ' + roomName + 
				', Room Owner: ' + roomOwnerName
				);

			$('#messages').append(newlistItem);
		});
	});

	socket.on('nameResult', function(result) {
		username = result.name;

		var message = 'You are now ' + username;

		var newlistItem = $('<li></li>').append($('<b></b>').text(message));
		$('#messages').append(newlistItem);
	});

	socket.on('message', function(data) {
		var message = data.message;

		var newlistItem = $('<li></li>').append($('<b></b>').text(message));
		$('#messages').append(newlistItem);
	});

	socket.on('editor result', function(data) {
		var message = data.edittext;

		// very simple and not what is wanted, but it will do for now.
		$("#editor").val(message);
	});

	$('#send-message').focus();

	$('#send-form').submit(function(event) {
		var message = $("#send-message").val();
		
		// test
		socket.emit('chat message', {
			'room': 1,
			'message': message
		});

		var newlistItem = $('<li></li>').text(username + ": " + message);
		$('#messages').append(newlistItem);

		$("#send-message").val('');

		return false;	
		//event.preventDefault();	
	});

	// when user presses this, send whatever is in the editor to the server
	$('#editor-form').submit(function(event) {
		var text = $('#editor').val();

		// send this data to server
		socket.emit('editor text', {
			// very inefficient, improve later.
			'text': text
		});

		return false;
	});
});