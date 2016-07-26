say = (args...)->
	
	message = '» ' + args.map((obj) -> Utils.inspect(obj)).join(", ")
	
	if App.inWebView()
		sameOrigin = undefined
		try
			sameOrigin = window.parent.location.host is window.location.host
		catch e
			sameOrigin = false

		if not sameOrigin
			return
		
		window.top.APP_CONSOLE.push message
		
		# Refresh the console
		if window.top.REFRESH_APP_CONSOLE isnt undefined
			window.top.REFRESH_APP_CONSOLE()
	else
		# Log message to the browser console
		console.log message
	return

log = say
