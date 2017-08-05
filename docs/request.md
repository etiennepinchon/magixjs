# Name
Request

# Description
Request is used to exchange data with a server behind the scenes. This means that it is possible to update data, without reloading the whole app.


##############################################################
# Section
Overview

## Description
Learn the various applications of Request and how to use it.

## About Example
Request can be used to perform an asynchronous Request (Ajax) request.

## Example
Request.get 'http://example.com/api/users.json', (data) ->
		# Success callback
	, (err) ->
		# Error callback
## End Example

## About Example
Events can also be set externally
## Example
req = Request.get 'http://example.com/api/users'
	parameters:
		limit: 100

req.onSuccess (data) ->
	# Success callback
req.onError: (err) ->
	# Error callback
## End Example


##############################################################
# Section
Request

## Description
The properties specific to Request.


##############################################################
## Property
parameters

### Type
<object>

### Description
The parameters to send with the URL.

### Example
# Update user information.
Request.update 'http://example.com/api/user',
	parameters:
		username: 'etienne'
		age: 21
	success: (data) ->
		# Success callback
	error: (data) ->
		# Error callback
### End Example


##############################################################
## Property
success

### Type
<function>

### Description
A function to be called if the request succeeds. The function gets passed two arguments: The data returned from the request and the status code.

### Example
Request.update 'http://example.com/api/user',
	parameters:
		username: 'etienne'
	success: (data) ->
		# Success callback
### End Example


##############################################################
## Property
error

### Type
<function>

### Description
A function to be called if the request fails. The function receives two arguments: The data returned from the request if any, and the status code.

### Example
Request.update 'http://example.com/api/users.json', (data) ->
		# Success callback
	, (err) ->
		# Error callback
### End Example


##############################################################
## Property
then

### Type
<function>

### Description
A function to be called when the request finishes (after success and error callbacks are executed).

### Example
Request.update 'http://example.com/api/users.json',
	then: ->
		# Request finished
### End Example


##############################################################
## Property
files

### Type
<object>

### Description
Allows you to attach files to the request (upload).

### Example
fileSelector = new FileField

# After a file is selected
fileSelector.onChange (event) ->
	file = this.file

	Request.send 'http://example.com/api/users/profile_picture',
		files: profile_picture: file
		success: (data) ->
			# Success callback
			# all good..
		error: (err) ->
			# Error callback
### End Example

##############################################################
## Method
get

### Description
Retrieve data from the server.

### Example
Request.get 'http://example.com/api/users.json'
### End Example


##############################################################
## Method
send

### Description
Upload data to the server (POST).

### Example
Request.send 'http://example.com/api/users.json'
### End Example


##############################################################
## Method
update

### Description
Update data on the server (PUT).

### Example
Request.update 'http://example.com/api/users.json'
### End Example


##############################################################
## Method
delete

### Description
Delete data from the server.

### Example
Request.delete 'http://example.com/api/users.json'
### End Example


##############################################################
## Property
async

### Type
<boolean>

### Description
By default, all requests are sent asynchronously (i.e. this is set to yes by default). If you need synchronous requests, set this option to no.

### Default
yes

### Example
Request.async = no
### End Example



##############################################################
# Section
Events

## Description
Listen to the Request events


##############################################################
## Method
onSuccess()

### Description
Called if the request succeeds. The function gets passed two arguments: The data returned from the request and the status code.

### Example
Request.update 'http://example.com/api/users.json'

net.onSuccess (data) ->
	# Success callback
### End Example


##############################################################
## Method
onError()

### Description
Called if the request fails. The function receives two arguments: The data returned from the request if any, and the status code.

### Example
Request.update 'http://example.com/api/users.json'

net.onError: (error) ->
	# Error callback
### End Example


##############################################################
## Method
onResponse()

### Description
Called when the request finishes (after success and error callbacks are executed).

### Example
net.onResponse (event) ->
	# Request finished
### End Example


##############################################################
## Method
onProgress()

### Description
Called when the request receive a progress. Can be useful when uploading a large file.

### Example
net.onProgress (event) ->
	# Log progress in percents
	log event.progress
### End Example


##############################################################
## Method
onAbort()

### Description
Called when the request is aborted.

### Example
net.onAbort () ->
	log 'Aborted'
### End Example


##############################################################
## Method
onLoaded()

### Description
Called when an request has finished loading.

### Alias
onLoad(),onDone()

### Example
net = Request.get 'http://example.com/api/users.json'
net.onLoaded (event) ->
	log 'Request finished loading'
### End Example


