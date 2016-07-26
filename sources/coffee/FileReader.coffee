# *********************************
# *********************************
# FileReader.js
# *********************************
# ** By Etienne Pinchon
# ** @2016
# https://developer.mozilla.org/en-US/docs/Web/API/FileReader
# https://developer.mozilla.org/en-US/docs/Web/API/Blob

window._FileReader = FileReader

class FileReader extends Element
    constructor: (parameters) ->
        if parameters is undefined
            parameters = {}
        
        if not (window._FileReader)
            @emit Event.Unsupported

            #log("Location: Location is not supported by this browser.");
            if properties.unsupported
                properties.unsupported()
            return false

        @reader = new (window._FileReader)
        _this = this

        ###
            FileReader.onloadstart
            A handler for the loadstart event. This event is triggered each time the reading is starting.
        ###

        @reader.addEventListener 'loadstart', ((e) ->
            _this.emit Event.LoadStart, e
            if parameters.start
                parameters.start e
            return
        ), false

        ###
            FileReader.onloadstart
            A handler for the loadstart event. This event is triggered each time the reading is starting.
        ###

        @reader.addEventListener 'loadend', ((e) ->
            _this.emit Event.LoadEnd, e
            if parameters.end
                parameters.end e
            return
        ), false

        ###
            FileReader.onprogress
            A handler for the progress event. This event is triggered while reading a Blob content.
        ###

        @reader.addEventListener 'progress', ((e) ->
            _this.emit Event.Progress, e
            if parameters.progress
                parameters.progress e
            return
        ), false

        ###
            FileReader.onload
            A handler for the load event. This event is triggered each time the reading operation is successfully completed.
        ###

        @reader.addEventListener 'load', (->
            _this.emit Event.Load, _this.reader.result
            if parameters.then
                parameters.then _this.reader.result
            else if parameters.done
                parameters.done _this.reader.result
            else if parameters.loaded
                parameters.loaded _this.reader.result
            return
        ), false

        ###
            FileReader.onerror
            A handler for the error event. This event is triggered each time the reading operation encounter an error.
        ###

        @reader.addEventListener 'error', (->
            _this.emit Event.Error, _this.reader.error
            if parameters.error
                parameters.error _this.reader.error
            return
        ), false

        ###
            FileReader.onerror
            A handler for the error event. This event is triggered each time the reading operation encounter an error.
        ###

        @reader.addEventListener 'abort', ((e) ->
            _this.emit Event.Abort, e
            if parameters.abort
                parameters.abort e
            return
        ), false

        ###
        FileReader.readAsArrayBuffer()
        Starts reading the contents of the specified Blob, once finished, the result attribute contains an ArrayBuffer representing the file's data.

        FileReader.readAsBinaryString() 
        Starts reading the contents of the specified Blob, once finished, the result attribute contains the raw binary data from the file as a string.

        FileReader.readAsDataURL()
        Starts reading the contents of the specified Blob, once finished, the result attribute contains a data: URL representing the file's data.
        At that time, the result attribute contains the data as a URL representing the file's data as a base64 encoded string.

        FileReader.readAsText()
        Starts reading the contents of the specified Blob, once finished, the result attribute contains the contents of the file as a text string.

        ###

        if parameters.arrayBuffer
            @arrayBuffer = parameters.arrayBuffer
        else if parameters.binary
            @binary = parameters.binary
        else if parameters.base64
            @base64 = parameters.base64
        else if parameters.text
            @text = parameters.text
        return

    _kind : 'FileReader'
        
    @define 'arrayBuffer',
        get: ->
            @_arrayBuffer
        set: (blob) ->
            @_arrayBuffer = blob
            @reader.readAsArrayBuffer blob
            return
    @define 'binary',
        get: ->
            @_binary
        set: (blob) ->
            @_binary = blob
            @reader.readAsBinaryString blob
            return
    @define 'base64',
        get: ->
            @_base64
        set: (blob) ->
            @_base64 = blob
            @reader.readAsDataURL blob
            return

    @define 'text',
        get: ->
            @_text
        set: (blob) ->
            @_text = blob
            @reader.readAsText blob
            return

    ##############################################################
    ## EVENT HELPERS

    onUnsupported : (cb) -> @on Event.Unsupported, cb
    onLoadStart : (cb) -> @on Event.LoadStart, cb
    onLoadEnd : (cb) -> @on Event.LoadEnd, cb
    onProgress : (cb) -> @on Event.Progress, cb
    onLoad : (cb) -> @on Event.Load, cb
    onLoaded : (cb) -> @on Event.Load, cb
    onDone : (cb) -> @on Event.Loaded, cb
    onAbort : (cb) -> @on Event.Abort, cb
    onQuit : (cb) -> @on Event.Quit, cb

        
FileReader::abort = (first_argument) ->
	if @reader isnt undefined
		@reader.abort()
	return



###
var reader = new FileReader({
	arrayBuffer: blob,

or

	binary: blob,

or

	base64: blob,

or

	text: blob
});

Example 1
var blob = new Blob(['Hello!'], {type: 'text/plain'});
var reader = new FileReader({
	text: blob,
	then: function(result) {
		console.log(result);
	}
});

reader.on(Event.LoadEnd, function() {
	console.log("Loading ended");
});

reader.on(Event.Progress, function(e) {
	console.log(e);
});

Example 2
var blob = new Blob(['Hello!'], {type: 'text/plain'});
var reader = new FileReader();
reader.base64 = blob;
reader.on(Event.Loaded, function(result) {
	console.log(result);
});

###