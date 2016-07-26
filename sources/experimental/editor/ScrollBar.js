var ScrollBar = function(properties) {
	this.init(properties);
	this.props({
		rigth: 0,
		pointerEvents: "none"
	});

	this.inner = new View({
	    cursor: "text",
	    x: 0,
	    y: 0,
		addTo: this
	});

    this.skipEvent = false;
    //this.visible = false;
}

ScrollBar.prototype = new View();


var ScrollBarV = function(properties) {
	this.init(properties);
	
	this.scrollTop = 0;

	this.width = 20;
	this.inner.width = 20;

	var _this = this;
}

ScrollBarV.prototype = new ScrollBar();

// Emitted when the scroll bar, well, scrolls.
ScrollBarV.prototype.onScroll = function() {
    if (!this.skipEvent) {
        this.emit("scroll", {data: this.scrollTop});
    }
    this.skipEvent = false;
};


// Sets the height of the scroll bar, in pixels.
// Use this.height

// Sets the inner height of the scroll bar, in pixels.
// Use this.inner.height

// Sets the scroll height of the scroll bar, in pixels.
// Use this.inner.height

// Sets the scroll top of the scroll bar.
// Use this.scrollTop


var ScrollBarH = function(properties) {
	this.init(properties);

	this.scrollLeft = 0;
	
	this.height = 20;
	this.inner.height = 20;

	var _this = this;
}

ScrollBarH.prototype = new ScrollBar();

ScrollBarH.prototype.onScroll = function() {
    if (!this.skipEvent) {
        this.emit("scroll", {data: this.scrollTop});
    }
    this.skipEvent = false;
};
