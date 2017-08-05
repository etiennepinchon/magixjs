# Name
Player

# Description
Players are the video and audio containers of Magix. Players have a pview object to control the media. They inherit all of the Views properties and methods and as such can be customized in the same way.

# Extends
view

##############################################################
# Section
Overview

## Description
Learn the various application of Player and how to use it.

## About Example
Players are used to play audio and video files in the project. They can be given the same properties as the view.

## Example
myPlayer = new Player
	width: 250
	height: 250
	video: 'video name'
## End Example

## About Example
Buttons can also be added to the layout to create a complete pview interface.

## Example
myPlayer = new Player
	 audio: 'Audio name'

# Create the Play/Pause button
playPauseButton = new Button
	text: 'Play'

playPauseButton.onClick ->
	this.text = 'Pause'
	 
	if myPlayer.paused
		this.text = 'Pause'
		myPlayer.play
	else
		this.text = 'Play'
		myPlayer.pause

# Create the Stop button
stopButton = new Button
	text: 'Stop'

stopButton.onClick ->
	# Pause and go back to the start of the audio
	myPlayer.pause
	myPlayer.currentTime = 0
	playPauseButton.text = 'Play'

# Add a volume control slider
volumeControl = new Slider
	x: 100
	y: 170
	width: 220
	value: 1

# Monitor the changing value of volumeControl
volumeControl.onValueChange, ->
	# Change the volume of myPlayer using the slider
	myPlayer.volume = volumeControl.value
## End Example



##############################################################
# Section
Media

## Description
Set the audio/video used by the pview.


##############################################################
## Property
audio

### Type
<string>

### Description
Set the url of an audio track for the pview.

### Example
myPlayer = new Player
	audio: 'audio name'
### End Example


##############################################################
## Property
video

### Type
<string>

### Description
Set the url of a video for the pview.

### Example
myPlayer = new Player
	video: 'video name'
### End Example



##############################################################
# Section
Controls

## Description
Controls to set the playback and volume of the pview.


##############################################################
## Method
play()

### Description
Play the media.

### Example
myPlayer = new Player
myPlayer.video = 'Video_Name'
myPlayer.parent = myView
myPlayer.play
### End Example


##############################################################
## Method
pause()

### Description
Pause the media.

### Example
myPlayer = new Player
myPlayer.video = 'Video_Name'
myPlayer.parent = Playground
myPlayer.pause
### End Example


##############################################################
## Methods
volume()

### Description
Set the volume of the media.

### Example
myPlayer = new Player
myPlayer.video = 'Video_Name'
myPlayer.parent = Playground
myPlayer.volume = 0.5
### End Example


##############################################################
## Property
paused

### Type
<boolean>

### Read only

### Description
Returns whether the audio/video is paused.

### Example
myPlayer = new Player
	video: 'Video_Name'
	parent: Playground

log myPlayer.paused
### End Example


##############################################################
## Property
loop

### Type
<boolean>

### Description
Set whether the audio/video should replay when it had ended.

### Default
Value is no.

### Example
myPlayer = new Player
	video: 'Video_Name'
	loop: yes
	parent: Playground
### End Example


##############################################################
## Property
muted

### Type
<boolean>

### Description
Set whether the audio/video should be muted.

### Example
myPlayer = new Player
	video: 'Video_Name'
	muted: yes
	parent: Playground
### End Example


##############################################################
## Property
defaultMuted

### Type
<boolean>

### Description
Set whether the audio/video pview should be muted by default. Setting this property will not affect whether the audio/video is currently muted. This can also return the default state.

### Example
myPlayer = new Player
	video: 'Video_Name'
	defaultMuted: yes
	parent: Playground
### End Example


##############################################################
## Property
autoplay

### Type
<boolean>

### Description
Set whether the media is to play as soon as it is loaded. This property will also return the state.

### Default
Value is no.

### Example
myPlayer = new Player
	video: 'Video_Name'
	autoplay: yes
	parent: Playground

# Get the autoplay state
log myPlayer.autoplay
### End Example


##############################################################
## Property
controls

### Type
<boolean>

### Description
Sets whether the browser should display standard video controls. These include the play/pause button, seeking, volume options, fullscreen toggle (for video), captions/subtitles(when available) and track (when available). This property will also whether this is enabled.

### Example
myPlayer = new Player
	video: 'Video_Name'
	controls: yes
### End Example



##############################################################
# Section
Playback

## Description
Get information about the playback of the media.


##############################################################
## Property
currentTime

### Type
<number>

### Description
Sets the playback position of the pview. When setting this property, the playback will jump to the new position. This can also return the current playback position.

### Example
myPlayer = new Player
	video: 'Video_Name'
	currentTime: 2
### End Example


##############################################################
## Property
duration

### Type
<number>

### Read only

### Description
Returns the length of the audio/video in seconds. If no audio/video is set, it will return NaN.

### Example
myPlayer = new Player
	video: 'Video_Name'

# Get length of the video
log myPlayer.duration
### End Example


##############################################################
## Property
ended

### Type
<boolean>

### Read only

### Description
Returns whether the playback of the pview has ended. Playback has ended only when its position is at the end of the audio/video.

### Example
myPlayer = new Player
	video: 'Video_Name'

# Get whether the video has finished playing
log myPlayer.ended
### End Example


##############################################################
## Property
played

### Type
<TimeRanges Object>

### Read only

### Description
Returns a TimeRanges object which will contain the start, end and length of the part of the audio/video the user has played.

### Example
myPlayer = new Player
	video: 'Video_Name'

# Get the start of the played range
log myPlayer.played.start

# Get the end of the played range
log myPlayer.played.end

# Get the length of the played range
log myPlayer.played.length
### End Example


##############################################################
## Property
playbackRate

### Type
<number>

### Description
Set the playback speed of the audio/video.

### Example
myPlayer = new Player
	video: 'Video_Name'
# Examples

# Normal speed
pview.playbackRate = 1.0

# Half speed
pview.playbackRate = 0.5

# Double speed
pview.playbackRate = 2.0

# Normal speed backwards
pview.playbackRate = -1.0

# Half speed backwards
pview.playbackRate = -0.5
### End Example


##############################################################
## Property
defaultPlaybackRate

### Type
<number>

### Description
Set the default playback rate of the audio/video. Setting this property will not affect the current playback rate of the pview. This can also return the default playback rate.

### Example
myPlayer = new Player
	video: 'Video_Name'
	defaultPlaybackRate: 1.5
### End Example


##############################################################
## Property
mediaGroup

### Type
<string>

### Description
Sets the name of the media group the audio/video is a part of. A media group allows 2 or more audio/video elements to be kept synchronised.

### Example
myPlayer = new Player
	video: 'Video_Name'
	mediaGroup: 'new group'

myPlayer2 = new Player
	video: 'Video_Name2'
	mediaGroup: 'new group'
### End Example


##############################################################
## Property
textTracks

### Type
<TextTracksList Object>

### Read only

### Description
Returns a TextTrackList object. The TextTrackList object represents the available text tracks for the audio/video.

### Example
myPlayer = new Player
	video: 'Video_Name'

# The number of available text tracks
log myPlayer.textTracks.length

# Get the TextTrack object by index (0 is an example)
log myPlayer.textTracks[0]
### End Example

### About Example
Each available text track is represented by a TextTrack Object.

### Example
myPlayer = new Player
	video: 'Video_Name'

# Get the type of the text track (can be: 'subtitles', 'caption', 'descriptions', 'chapters', or 'metadata')
log myPlayer.textTracks[0].kind

# Get the label of the text track
log myPlayer.textTracks[0].label

# Get the language of the text track
log myPlayer.textTracks[0].language

# Get or set if the track is active ('disabled'|'hidden'|'showing')
log myPlayer.textTracks[0].mode

# Get a list of cues as a TextTrackCueList object
log myPlayer.textTracks[0].cues

# Get the currently active text track cues as a TextTrackCueList object
log myPlayer.textTracks[0].activeCues

# Add a cue to the list of cues
myPlayer.textTracks[0].addCue cue

# Remove a cue from the list of cues
myPlayer.textTracks[0].removeCue cue
### End Example



##############################################################
# Section
Seeking

## Description
Seek to a certain point in he audio/video.


##############################################################
## Property
seeking

### Type
<boolean>

### Read only

### Description
Returns whether the user is currently seeking in the audio/video. Seeking is when you move/skip to a new position in the audio/video.

### Example
myPlayer = new Player
	video: 'Video_Name'

log myPlayer.seeking
### End Example


##############################################################
## Property
seekable

### Type
<TimeRanges Object>

### Read only

### Description
This returns a TimeRanges object which will contain the start, end and length of the part of the audio/video the user can seek to. For non-streaming videos it is often possible to seek anywhere in the video even before it has been buffered.

### Example
myPlayer = new Player
	video: 'Video_Name'

# Get the start of the played range
log myPlayer.seekable.start

# Get the end of the played range
log myPlayer.seekable.end

# Get the length of the played range
log myPlayer.seekable.length
### End Example


##############################################################
# Section
Buffering

## Description
Get network and buffering information.


##############################################################
## Property
buffered

### Type
<TimeRanges Object>

### Read only

### Description
This returns a TimeRanges object which will contain the start, end and length of the buffered parts of the audio/video.

### Example
myPlayer = new Player
	video: 'Video_Name'

# Get the start of the buffered range
log myPlayer.buffered.start

# Get the end of the buffered range
log myPlayer.buffered.end

# Get the length of the buffered range
log myPlayer.buffered.length
### End Example


##############################################################
## Property
networkState

### Type
<number>

### Read only

### Description
Returns the current network state (activity) of the audio/video.

### Example
myPlayer = new Player
	video: 'Video_Name'

# networkState can return 4 values

log myPlayer.networkState
# 0 - audio/video has not yet been initialised

log myPlayer.networkState
# 1 - audio/video is active and has selected a resource, but is not using the network

log myPlayer.networkState
# 2 - browser is downloading data

log myPlayer.networkState
# 3 - no audio/video source found
### End Example


##############################################################
## Property
preload

<string>

### Description
The preload property sets or returns whether the audio/video should start loading as soon as the page loads.

### Example
myPlayer = new Player
	video: 'Video_Name'

# Indicates that the audio/video should start loading as soon as the page loads
myPlayer.preload = 'auto'

# Indicates that only the metadata for the audio/video should be loaded when the page loads
myPlayer.preload = 'metadata'

# Indicates that the audio/video should NOT start loading as soon as the page loads
myPlayer.preload = 'none'
### End Example


##############################################################
## Property
readyState

### Type
<number>

### Read only

### Description
Returns the ready network state of the audio/video. The ready state indicates if the audio/video is ready to play or not.

### Example
myPlayer = new Player
	video: 'video name'

# readyState can return 5 values

log myPlayer.readyState
# 0 - no information whether or not the audio/video is ready

log myPlayer.readyState
# 1 - metadata for the audio/video is ready

log myPlayer.readyState
# 2 - data for the current playback position is available, but not enough data to play next frame/millisecond

log myPlayer.readyState
# 3 - data for the current and at least the next frame is available

log myPlayer.readyState
# 4 - enough data available to start playing
### End Example





##############################################################
# Section
Player Events

## Description
Monitor all the actions of the pview.


##############################################################
## Method
onCanPlay()

### Description
Called when the Player can start playing the audio/video.

### Example
myPlayer.onCanPlay, (events) ->
	log 'Media can be played'
### End Example


##############################################################
## Method
onCanPlayThrough()

### Description
Called when the Player can play through the audio/video without stopping for buffering.

### Example
myPlayer.onCanPlayThrough, (events) ->
	log 'Can play through'
### End Example


##############################################################
## Method
onDurationChange()

### Description
The duration of the audio/video has changed.

### Example
myPlayer.onDurationChange, (events) ->
	log 'Duration changed'
### End Example


##############################################################
## Method
onEmptied()

### Description
Called when the current playlist is empty.

### Example
myPlayer.onEmptied, (events) ->
	log 'Audio/video removed'
### End Example


##############################################################
## Method
onReachEnd()

### Description
The pview has reached the end of the audio/video.

### Example
myPlayer.onEmptied, (events) ->
	log 'Audio/video removed'
### End Example


##############################################################
## Method
onLoadedData()

### Description
The audio/video data has finished loading.

### Example
myPlayer.onLoadedData (event) ->
	log 'Audio/video data has finished loading'
### End Example


##############################################################
## Method
onLoadedMetaData()

### Description
The audio/video metadata has finished loading.

### Example
myPlayer.onLoadedMetaData (event) ->
	log 'Audio/video metadata has finished loading'
### End Example


##############################################################
## Method
onLoadStart()

### Description
Called when the loading has started.

### Example
myPlayer.onLoadStart (event) ->
	log 'Start'
### End Example

##############################################################
## Method
onLoadEnd()

### Description
Called when the loading is completed (either in success or failure).

### Example
myPlayer.onLoadEnd (event) ->
	log 'End'
### End Example

##############################################################
## Method
onLoaded()

### Description
Called when the loading is successfully completed.

### Example
myPlayer.onLoaded (event) ->
	log 'Loaded'
### End Example


##############################################################
## Method
onPause()

### Description
Called when the audio/video is paused.

### Example
myPlayer.onPause (event) ->
	log 'Paused'
### End Example


##############################################################
## Method
onPlay()

### Description
Called when the audio/video starts playing.

### Example
myPlayer.onPlay (event) ->
	log 'Play'
### End Example


##############################################################
## Method
onPlaying()

### Description
Called when the media is playing.

### Example
myPlayer.onPause (event) ->
	log 'Playing'
### End Example


##############################################################
## Method
onProgress

### Description
Called while loading the media.

### Example
myPlayer.onProgress (event) ->
	log event
### End Example


##############################################################
## Method
onSpeedChange

### Description
Called when the playback rate of the pview has changed.

### Example
myPlayer.onSpeedChange (event) ->
	log 'Speed Change'
### End Example


##############################################################
## Method
onSeeked()

### Description
Called when the user has finished moving/skipping to a new position in the audio/video.

### Example
myPlayer.onSeeked (event) ->
	log 'Seeked'
### End Example

##############################################################
## Method
onSeeking()

### Description
Called when the user starts moving/skipping to a new position in the audio/video.

### Example
myPlayer.onSeeking (event) ->
	log 'Seeking'
### End Example

##############################################################
## Method
onStalled()

### Description
Called when the pview is trying to load new data which is unavailable.

### Example
myPlayer.onStalled (event) ->
	log 'Media stalled'
### End Example


##############################################################
## Method
onSuspend()

### Description
Called when the browser is intentionally not getting audio/video data.

### Example
myPlayer.onSuspend (event) ->
	log 'Media suspended'
### End Example


##############################################################
## Method
onTimeUpdate()

### Description
Called during playback returning current playback position.

### Example
myPlayer.onTimeUpdate (event) ->
	log myPlayer.currentTime
### End Example


##############################################################
## Method
onVolumeChange()

### Description
Called when the volume is changed.

### Example
myPlayer.onVolumeChange (event) ->
	log 'Volume being changed'
### End Example

##############################################################
## Method
onWaiting()

### Description
Called when the video stops because it hasn't buffered the next frame.

### Example
myPlayer.onWaiting (event) ->
	log 'Waiting'
### End Example


##############################################################
## Method
onAbort()

### Description
Called when the loading is aborted.

### Example
myPlayer.onAbort () ->
	log 'Aborted'
### End Example


##############################################################
## Method
onError()

### Description
Called when an error occurred loading the audio/video.

### Example
myPlayer.onError (event) ->
	log 'Error'
### End Example

