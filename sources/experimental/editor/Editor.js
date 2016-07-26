var Editor = function(properties) {

	this.init(properties);
	this.props({
		width: "100%",
		height: "100%"
	});

	// Left gutter
	this.gutter = new View({
		x: 0,
		y: 0,
		cursor: "default",
		index: 4,
		addTo: this
	});

	var lines = [{
		number: 1,
	},{
		number: 2,
	},{
		number: 3,
	},{
		number: 4,
	},{
		number: 5,
	},{
		number: 6,
	}];

	this.gutterList = new List({
		marginTop: 8,
		width: 50,
		length: function() {
			return lines.length;
		},
		addTo: this.gutter
	});
	this.gutterList.element.style.textAlign = "right";

	this.gutterList.each(function(item, index) {
		
		if (item === null) {
			item = new ListItem();

			item.label = new Label({
				display: "block",
				width: "100%",
				color: "black", // "#DDD"
				fontSize: 12,
				superview: item
			});
		}

		item.label.text = lines[index].number;
		
		return item;
	});





	// Code container
	this.container = new View({
		x: 50,
		y: 0,
		bottom: 0,
		right: 0,
		cursor: "text",
		fixed: true,
		//index: 4,
		backgroundColor: "white",
		addTo: this
	});

	// Hold the code
	this.content = new View({
		minWidth: "100%",
		marginTop: 8,
		addTo: this.container
	});

	this.editorText = new EditorText({
		backgroundColor: "blue",
		addTo: this.container
	});


	// Cursors
	this.cursors = new Cursors({
		addTo: this.container
	});

	// Scrollbars
	this.scrollBarV = new ScrollBarV({
		addTo: this.container
	});
    this.scrollBarH = new ScrollBarH({
		addTo: this.container
	});

	// Scrollbars events
	this.scrollBarV.on(Events.Scroll, function(e) {
        //if (!_self.$scrollAnimation)
        //   _self.session.setScrollTop(e.data - _self.scrollMargin.top);
    });
    this.scrollBarH.on(Events.Scroll, function(e) {
        //if (!_self.$scrollAnimation)
        //    _self.session.setScrollLeft(e.data - _self.scrollMargin.left);
    });

    this.scrollTop = 0;
    this.scrollLeft = 0;

    this.cursorPosition = {
        row : 0,
        column : 0
    };

	console.log("ok");
	window.addEventListener("resize", function() {


	});



    /*editor.on("destroy", function() {
        event.removeListener(window, "resize", env.onResize);
    });*/


}

Editor.prototype = new View();

Editor.prototype.method_name = function(first_argument) {
	// body...
};