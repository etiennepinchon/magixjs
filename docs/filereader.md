# Name
FileReader

# Description
FileReader lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.


##############################################################
## Property
arrayBuffer

### Type
<blob object>

### Description
Starts reading the contents of the specified Blob, once finished, the result attribute contains the contents of the file as an array buffer.

### Example
blob = new Blob ['Hello!'],
	 type: 'text/plain'

reader = new FileReader
	arrayBuffer: blob,
	then: (result) ->
		log result
### End Example

##############################################################
## Property
binary

### Type
<blob object>

### Description
Starts reading the contents of the specified Blob, once finished, the result attribute contains the contents of the file as binary.

### Example
blob = new Blob ['Hello!'],
	 type: 'text/plain'

reader = new FileReader
	binary: blob,
	then: (result) ->
		log result
### End Example

##############################################################
## Property
base64

### Type
<blob object>

### Description
Starts reading the contents of the specified Blob, once finished, the result attribute contains the contents of the file as a base64 number.

### Example
blob = new Blob ['Hello!'],
	 type: 'text/plain'

reader = new FileReader
	base64: blob,
	then: (result) ->
		log result
### End Example

##############################################################
## Property
text

### Type
<blob object>

### Description
Starts reading the contents of the specified Blob, once finished, the result attribute contains the contents of the file as a text string.

### Example
blob = new Blob ['Hello!'],
	 type: 'text/plain'

reader = new FileReader
	text: blob,
	then: (result) ->
		log result
### End Example



##############################################################
## Method
onProgress()

### Description
Called while reading a Blob's content.

### Example
reader.onProgress (event) ->
	log 'Progress'
### End Example


##############################################################
## Method
onLoadStart()

### Description
Called when the reading has started.

### Example
reader.onLoadStart () ->
	log 'Start'
### End Example

##############################################################
## Method
onLoadEnd()

### Description
Called when the reading operation is completed (either in success or failure).

### Example
reader.onLoadEnd (event) ->
	log 'End'
### End Example


##############################################################
## Method
onLoaded()

### Description
Called when the reading operation is successfully completed.

### Example
reader.onLoaded (event) ->
	log 'Loaded'
### End Example

##############################################################
## Method
onAbort()

### Description
Called when the reading operation is aborted.

### Example
reader.onAbort () ->
	log 'Aborted'
### End Example

##############################################################
## Method
onError()

### Description
Called when an error occurred loading the audio/video.

### Example
reader.onError (event) ->
	log 'Error'
### End Example

