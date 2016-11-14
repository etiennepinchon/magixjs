log = (args...)->
	
	message 	= '» ' + args.map((obj) -> Utils.inspect(obj)).join(", ")
	sameOrigin 	= NULL

	if App.inWebView()
		try
			sameOrigin = window.parent.location.host is window.location.host
		catch e
			sameOrigin = NULL
		return if not sameOrigin
		window.top.ORB_CONSOLE.push message
		if window.top.REFRESH_ORB_CONSOLE isnt NULL
			window.top.REFRESH_ORB_CONSOLE()
	else
		console.log message
	return

log._times = {}
log.time = (name)->
	log._times[name] = window.performance.now()
	return
log.timeEnd = (name)->
	return if not log._times[name]
	log Utils.round(window.performance.now()-log._times[name], 2)+'ms'

###
TODO

log 'hello',
	color: black
	fontSize: 40

###