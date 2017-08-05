# Name
Say

# Description
Say allows you to do speech synthesis in your app very easily. Make your app talk to your users!


##############################################################
## Property
Overview

### Description
Say allows you to do speech synthesis in your app very easily. Make your app talk to your users!

### Example
say 'Hello!'
### End Example


##############################################################
## Property
voice

### Type
<float>

### Description
Gets and sets the voice that the utterance will be spoken at.

### Example
say 'Hello!',
	voice: 'Whisper'
### End Example


##############################################################
## Property
volume

### Type
<float>

### Description
Gets and sets the volume that the utterance will be spoken at.

### Example
say 'Hello!',
	volume: 0.8
### End Example


##############################################################
## Property
rate

### Type
<float>

### Description
Gets and sets the speed at which the utterance will be spoken at.

### Example
say 'Hello!',
	rate: 2
### End Example


##############################################################
## Property
pitch

### Type
<float>

### Description
Gets and sets the pitch at which the utterance will be spoken at.

### Example
say 'Hello!',
	pitch: 1.5
### End Example


##############################################################
## Property
language

### Type
<float>

### Description
Gets and sets the language of the utterance.

### Example
say 'Hello!',
	language: 'en-US'
### End Example


##############################################################
## Property
volume

### Type
<float>

### Description
Gets and sets the volume that the utterance will be spoken at.

### Example
say 'Hello!',
	volume: 0.8
### End Example


##############################################################
## Method
getVoicesAvailable()

### Description
Return an object with all the different voices available with lamguage information.

### Example
console.log say.getVoicesAvailable()
### End Example


##############################################################
## Method
getVoicesNameAvailable()

### Description
Return an object with all the different voice names available.

### Example
console.log say.getVoicesNameAvailable()
### End Example


##############################################################
## Method
pause()

### Description
Puts the Say object into a paused state.

### Example
speech = say 'hi'
speech.pause()
### End Example


##############################################################
## Method
resume()

### Description
Puts the Say object into a non-paused state: resumes it if it was already paused.

### Example
speech = say 'hi'
speech.pause()
speech.resume()
### End Example


##############################################################
## Method
cancel()

### Description
Removes all utterances from the utterance queue.

### Example
speech = say 'hi'
speech.cancel()
### End Example


##############################################################
## Method
onUnsupported()

### Description
Triggered when Say is not supported by the browser.

### Example
speech = say 'hi'
speech.onUnsupported (event) ->
	log 'Unsupported'
### End Example


##############################################################
## Method
onBoundary()

### Description
Fired when the spoken utterance reaches a word or sentence boundary.

### Example
speech = say 'hi'
speech.onBoundary (event) ->
	log 'boundary'
### End Example


##############################################################
## Method
onStart()

### Description
Fired when the utterance has begun to be spoken.

### Example
speech = say 'hi'
speech.onStart (event) ->
	log 'started'
### End Example


##############################################################
## Method
onEnd()

### Description
Fired when the utterance has finished being spoken.

### Example
speech = say 'hi'
speech.onEnd (event) ->
	log 'ended'
### End Example


##############################################################
## Method
onPause()

### Description
Fired when the utterance is paused part way through.

### Example
speech = say 'hi'
speech.onPause (event) ->
	log 'Paused'
speech.pause()
### End Example


##############################################################
## Method
onResume()

### Description
Fired when a paused utterance is resumed.

### Example
speech = say 'hi'
speech.onResume (event) ->
	log 'Resumed'
speech.pause()
speech.resume()
### End Example

##############################################################
## Method
onError()

### Description
Fired when an error occurs that prevents the utterance from being succesfully spoken.

### Example
speech = say 'hi'
speech.onError (event) ->
	log 'error'
### End Example

