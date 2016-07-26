var EditorText = function(properties) {
	this.init(properties);
	this.props({
		x: 0,
		y: 0,
		width: "100%",
	    height: "100%",
	    paddingX: 4,
	});

	this.element.style.wordWrap = "normal";
	this.element.style.whiteSpace = "pre";

	this.EOF_CHAR = "\xB6";
    this.EOL_CHAR_LF = "\xAC";
    this.EOL_CHAR_CRLF = "\xa4";
    this.EOL_CHAR = this.EOL_CHAR_LF;
    this.TAB_CHAR = "\u2014"; //"\u21E5";
    this.SPACE_CHAR = "\xB7";
}

EditorText.prototype = new View();
