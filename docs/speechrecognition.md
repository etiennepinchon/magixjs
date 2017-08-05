# Name
SpeechRecognition

# Description
Speech recognition involves receiving speech through a device's microphone, which is then checked by a speech recognition service against a list of grammar (basically, the vocabulary you want to have recognised in a particular app.) When a word or phrase is successfully recognised, it is returned as a result (or list of results) as a text string, and further actions can be initiated as a result.


##############################################################
## Overview
Overview

### Description
Speech recognition involves receiving speech through a device's microphone, which is then checked by a speech recognition service against a list of grammar (basically, the vocabulary you want to have recognised in a particular app.) When a word or phrase is successfully recognised, it is returned as a result (or list of results) as a text string, and further actions can be initiated as a result.

### Example
speech = new SpeechRecognition()
if speech.supported
	speech.start()
### End Example


##############################################################
## Property
continuous

### Type
<bolean>

### Description
Stops the speech recognition service from listening to incoming audio.

### Example
speech = new SpeechRecognition
	continuous: yes
speech.start()
### End Example

##############################################################
## Property
interimResults

### Type
<bolean>

### Description
Controls whether interim results should be returned.

### Example
speech = new SpeechRecognition
	interimResults: yes
speech.start()
### End Example

##############################################################
## Property
lang

### Type
<text>

### Description
Sets the language of the current SpeechRecognition.

### Example
speech = new SpeechRecognition
	lang: 'en-US'
speech.start()
### End Example

##############################################################
## Property
grammars

### Type
<bolean>

### Description
Sets a collection of SpeechGrammar objects that represent the grammars that will be understood by the current SpeechRecognition.

### Example
grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
speechRecognitionList = new SpeechGrammarList()
speechRecognitionList.addFromString(grammar, 1)
speech = new SpeechRecognition
	grammars: speechRecognitionList
speech.start()
### End Example





##############################################################
## Method
start()

### Description
Start the speech recognition service listening to incoming audio with intent to recognize grammars.

### Example
speech.onStart()
### End Example


##############################################################
## Method
stop()

### Description
Stop the speech recognition service from listening to incoming audio.

### Example
speech.onStop()
### End Example


##############################################################
## Method
abort()

### Description
Abort the speech recognition service from listening to incoming audio.

### Example
speech.onAbort()
### End Example


##############################################################
## Method
onUnsupported()

### Description
Called while reading a Blob's content.

### Example
speech.onUnsupported (event) ->
	log 'Unsupported'
### End Example


##############################################################
## Method
onAudioStart()

### Description
Fired when the app has started to capture audio.

### Example
speech.onAudioStart (event) ->
	log 'Audio Start'
### End Example


##############################################################
## Method
onAudioEnd()

### Description
Fired when the app has finished capturing audio.

### Example
speech.onAudioEnd (event) ->
	log 'Audio End'
### End Example


##############################################################
## Method
onNoMatch()

### Description
Fired when the speech recognition service returns a final result with no significant recognition.

### Example
speech.onNoMatch (event) ->
	log 'No match'
### End Example


##############################################################
## Method
onResult()

### Description
Fired when the speech recognition service returns a result — a word or phrase has been positively recognized and this has been communicated back to the app.

### Example
speech.onResult (event) ->
	log 'Result'
### End Example


##############################################################
## Method
onSoundStart()

### Description
Fired when any sound — recognisable speech or not — has been detected.

### Example
speech.onSoundStart (event) ->
	log 'Sound start'
### End Example

##############################################################
## Method
onSoundEnd()

### Description
Fired when any sound — recognisable speech or not — has stopped being detected.

### Example
speech.onSoundEnd (event) ->
	log 'Sound end'
### End Example

##############################################################
## Method
onSpeechStart()

### Description
Fired when any sound — recognisable speech or not — has been detected.

### Example
speech.onSpeechStart () ->
	log 'Start'
### End Example

##############################################################
## Method
onSpeechEnd()

### Description
Fired when speech recognised by the speech recognition service has stopped being detected.

### Example
speech.onSpeechEnd (event) ->
	log 'End'
### End Example


##############################################################
## Method
onStart()

### Description
Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition (when the start event fires.).

### Example
speech.onStart () ->
	log 'Start'
### End Example


##############################################################
## Method
onEnd()

### Description
Fired when the speech recognition service has disconnected (when the end event fires.).

### Example
speech.onEnd (event) ->
	log 'End'
### End Example


##############################################################
## Method
onError()

### Description
Called when an error occurred.

### Example
speech.onError (event) ->
	log 'Error'
### End Example






