# Name
Thread

# Description
Thread is used to run processes in the background without interfering with the page. You can use Thread to run whatever you want. The thread process cannot be used to render the UI.



##############################################################
## Overview
Overview

### Description
Thread allows you to run a process in the background, independently of the page and send the result back to the page. Once the result is sent back to the page it can be used to do anything. For example the frame of a view can be calculated in a threaded process.

### Example
# Send data from the "myThread" to the main thread every 400ms
myThread = new Thread ->
	# Compute
	setInterval ->
		self.send('stuff')
		return
	, 400

myThread.onReceive (e) ->
	console.log e

myThread.onError (e) ->
	console.log e
### End Example


##############################################################
## Method
send()

### Description
This allows you to send and receive a process from the thread.

### Alias
emit()

### Example
myThread = new Thread
	self.addEventListener 'message', (e) ->
		self.send e.data
	, no

myThread.onReceive (e) ->
	# Output
	log 'thread said: ', e.data

myThread.send 'Hello World'
### End Example


##############################################################
## Method
end()

### Description
This allows you to end the thread process before it finishes.

### Alias
stop(),terminate()


### Example
myThread = new Thread
	# ...

# Kill the thread
myThread.end()

# Example will not log anything
### End Example


##############################################################
## Method
onReceive()

### Description
Called when data sent from a thread is received on the main thread (your app).

### Example
myThread = new Thread
	i = 0
	setInterval ->
		i++
		send i
	, 500

myThread.onReceive (e) ->
	log e.data
### End Example


##############################################################
## Method
onSend()

### Description
Called when data is sent from the main thread.

### Example
myThread = new Thread
	# ...

# Listen to the event
myThread.onSend (e) ->
	log 'Sent!'

# Send data to the thread
myThread.send 'Hello World'
### End Example


##############################################################
## Method
onStop()

### Description
Called when a Thread is stopped.

### Alias
onTerminate

### Example
myThread = new Thread
	# ...

# Listen to the event
myThread.onStop (e) ->
	log 'myThread has been killed!'

# Stop the thread
myThread.end()
### End Example


##############################################################
## Method
onError()

### Description
Called when an error happened.

### Example
myThread = new Thread
	# ...

# Listen to the event
myThread.onError (e) ->
	log 'Woops!'
### End Example


##############################################################
## Method
onUnsupported()

### Description
Called when Thread is not supported by the browser.

### Example
myTextView.onUnsupported (event) ->
	log 'Thread unavailable'
### End Example


