var Cursors = function(properties) {
	this.init(properties);
	this.props({
		width: "100%",
		height: "100%",
		x: 0,
		y: 0,
		pointerEvents: "none"
	});

	var _this = this;

	this.cursorsList = [];
	this.isVisible = true;
		
	// Blinking cursor
	this.blinkInterval = Utils.interval(0.5, function() {
		for (var i = 0; i < _this.cursorsList.length; i++) {
			if (_this.cursorsList[i].visible) {
				_this.cursorsList[i].visible = false;
			}
			else {
				_this.cursorsList[i].visible = true;
			}
		};
	});

	this.addCursor();
}

Cursors.prototype = new View();

Cursors.prototype.addCursor = function() {

	var cursor = new View({
		x: 0,
		y: 0,
		width: 3,
		height: 19,
		backgroundColor: "#547df3",
		addTo: this
	});

	this.cursorsList.push(cursor);
};

Cursors.prototype.removeCursor = function() {
	if (this.cursorsList.length > 1) {
        var el = this.cursorsList.pop();

        // Stop blinking interval
        //el.cursorBlink.stop();

        // Remove cursor
        this.removeSubview(el);
        return el;
    }
    return false;
};

Cursors.prototype.hideCursors = function() {
	 this.isVisible = false;

	 for (var el in this.cursorsList) {
	 	el.visible = false;
	 }
};

Cursors.prototype.showCursors = function() {
	 this.isVisible = true;

	 for (var el in this.cursorsList) {
	 	el.visible = true;
	 }
};




