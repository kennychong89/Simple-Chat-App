var Room = function(roomNumber, roomName, roomOwnerName) {
	this.roomNumber = roomNumber;
	this.roomName = roomName;
	this.roomOwnerName = roomOwnerName;
};

Object.defineProperties(Room.prototype, {
	"roomNumber": {
		get: function() { return this.__roomNumber; },
		set: function(roomNumber) { this.__roomNumber = roomNumber; }
	},
	"roomName": {
		get: function() { return this.__roomName; },
		set: function(roomName) { this.__roomName = roomName; }
	},
	"roomOwnerName": {
		get: function() { return this.__roomOwnerName; },
		set: function(roomOwnerName) { this.__roomOwnerName = roomOwnerName; }
	}
});

/*
Object.defineProperty(Room.prototype, "roomNumber", {
	get: function() { return this.__roomNumber; },
	set: function(roomNumber) { this.__roomNumber = roomNumber; }
});

Object.defineProperty(Room.prototype, "roomName", {
	get: function() { return this.__roomName; },
	set: function(roomName) { this.__roomName = roomName; }
});

Object.defineProperty(Room.prototype, "roomOwnerName", {
	get: function() { return this.__roomOwnerName; },
	set: function(roomOwnerName) { this.__roomOwnerName = roomOwnerName; }
});
*/

module.exports = Room;

/*
Room.prototype.getRoomNumber = function() {
	return this.roomNumber;
}

Room.prototype.setRoomNumber = function(roomNumber) {
	this.roomNumber = roomNumber;
}

Room.prototype.getRoomTitle = function() {
	return roomTitle;
}

Room.prototype.setRoomTitle = function(roomTitle) {
	this.roomTitle = roomTitle;
}
*/

